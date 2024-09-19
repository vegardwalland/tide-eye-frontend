import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HarborSelector = ({ onSelect }) => {
  const [harbors, setHarbors] = useState([]);  // Initialize as an empty array
  const [selectedHarbor, setSelectedHarbor] = useState('');  // Stores the selected harbor

  // Fetch the harbor list when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/api/harbors')
      .then(response => {
        // Ensure the response is an array and update the state
        if (Array.isArray(response.data)) {
          setHarbors(response.data);  // Set the harbors to the data returned by the backend
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch(err => console.error("Error fetching harbors:", err));
  }, []);

  // Handle when a user selects a harbor
  const handleSelect = (e) => {
    const selected = e.target.value;
    setSelectedHarbor(selected);  // Update the selected harbor state
    onSelect(selected);  // Trigger the callback function
  };

  return (
    <div>
      <label htmlFor="harbor">Select Harbor:</label>
      <select id="harbor" value={selectedHarbor} onChange={handleSelect}>
        <option value="">Select a harbor</option>
        {harbors.map(harbor => (
          <option key={harbor} value={harbor}>
            {harbor}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HarborSelector;
