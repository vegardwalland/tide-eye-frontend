import React, { useState, useEffect } from 'react';
import HarborSelector from './HarborSelector';
import TideChart from './TideChart';
import HarborMap from './HarborMap';
import axios from 'axios';

const Dashboard = () => {
  const [selectedHarbors, setSelectedHarbors] = useState(['', '']);
  const [harborData, setHarborData] = useState([null, null]);
  const [harbors, setHarbors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/harbors')
      .then(response => {
        if (Array.isArray(response.data)) {
          setHarbors(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch(err => console.error("Error fetching harbors:", err));
  }, []);

  useEffect(() => {
    selectedHarbors.forEach((harbor, index) => {
      if (harbor) {
        axios.get(`http://localhost:8080/api/tides/${harbor}`)
          .then(response => {
            setHarborData(prevData => {
              const newData = [...prevData];
              newData[index] = response.data;
              return newData;
            });
          })
          .catch(err => console.error("Error fetching tide data:", err));
      }
    });
  }, [selectedHarbors]);

  // Extract just the names for the HarborSelector
  const harborNames = harbors.map(harbor => harbor.name);

  const handleSelect = (index, value) => {
    const newSelectedHarbors = [...selectedHarbors];
    newSelectedHarbors[index] = value;
    setSelectedHarbors(newSelectedHarbors);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <HarborSelector
          harbors={harborNames}
          selectedHarbor={selectedHarbors[0]}
          onSelect={(value) => handleSelect(0, value)}
        />
        <HarborSelector
          harbors={harborNames}
          selectedHarbor={selectedHarbors[1]}
          onSelect={(value) => handleSelect(1, value)}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          {harborData[0] && (
            <div>
              <h2>Data for {selectedHarbors[0]}</h2>
              <TideChart selectedHarbor={selectedHarbors[0]} tideData={harborData[0]} />
            </div>
          )}
          {harborData[1] && (
            <div>
              <h2>Data for {selectedHarbors[1]}</h2>
              <TideChart selectedHarbor={selectedHarbors[1]} tideData={harborData[1]} />
            </div>
          )}
        </div>
        {/* Pass selectedHarbors and full harbor objects (with coordinates) to the map */}
        <HarborMap selectedHarbors={selectedHarbors} harbors={harbors} />
      </div>
    </div>
  );
};

export default Dashboard;
