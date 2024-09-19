// HarborMap.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const HarborMap = () => {
  const [harbors, setHarbors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHarbors = async () => {
      try {
        const response = await axios.get('/api/harbors'); // Adjust endpoint as needed
        setHarbors(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHarbors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching harbors</div>;

  return (
    <div>
      {harbors.length > 0 ? (
        harbors.map((harbor, index) => (
          <div key={index}>
            {/* Render harbor details */}
            <p>{harbor.name}</p>
            <p>{harbor.coordinates}</p>
          </div>
        ))
      ) : (
        <p>No harbors available</p>
      )}
    </div>
  );
};

export default HarborMap;
