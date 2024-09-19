import React, { useState } from 'react';

const HarborSelector = ({ harbors, onSelect }) => {
  const [selectedHarbor, setSelectedHarbor] = useState('');  // Stores the selected harbor

  // Handle when a user selects a harbor
  const handleSelect = (e) => {
    const selected = e.target.value;
    setSelectedHarbor(selected);  // Update the selected harbor state
    onSelect(selected);  // Trigger the callback function
  };

  return (
    <div>
      <label htmlFor="harbor">Select Harbor: </label>
      <select id="harbor" value={selectedHarbor} onChange={handleSelect}>
        <option value="">Select a harbor</option>
        {harbors.map((harbor, index) => (
          <option key={index} value={harbor}>
            {harbor}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HarborSelector;
