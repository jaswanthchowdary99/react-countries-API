
import React from 'react';

function Filter({ handleFilterChange }) {
  const continents = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleChange = (e) => {
    handleFilterChange(e.target.value);
  };

  return (
    <div className="filter">
      <select id="continent-filter" onChange={handleChange} defaultValue="">
        <option value="">Filter by Region</option>
        {continents.map((continent, index) => (
          <option key={index} value={continent}>{continent}</option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
