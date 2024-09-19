// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import HarborSelector from './HarborSelector';
import TideChart from './TideChart';
import HarborMap from './HarborMap';
import axios from 'axios';

const Dashboard = () => {
  const [selectedHarbor, setSelectedHarbor] = useState('');
  const [harborData, setHarborData] = useState(null);
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
    if (selectedHarbor) {
      axios.get(`http://localhost:8080/api/tides/${selectedHarbor}`)
        .then(response => {
          setHarborData(response.data);
        })
        .catch(err => console.error("Error fetching tide data:", err));
    }
  }, [selectedHarbor]);

  return (
    <div>
      <HarborSelector onSelect={setSelectedHarbor} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {harborData && (
          <div>
            <h2>Data for {harborData.harbor}</h2>
            <TideChart data={harborData} />
            <HarborMap harbors={harbors} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
