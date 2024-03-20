
import React, { useState, useEffect } from 'react';

function Filter({ handleFilterChange, handleSortChange }) {
  const [subregions, setSubregions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubregion, setSelectedSubregion] = useState('');

  const continents = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const sortOptions = ['Ascending by Area', 'Descending by Area', 'Ascending by Population', 'Descending by Population'];

  useEffect(() => {
    async function fetchSubregions() {
      if (selectedRegion !== '') {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`);
          if (response.ok) {
            const data = await response.json();
            const uniqueSubregions = Array.from(new Set(data.map(country => country.subregion)));
            setSubregions(uniqueSubregions);
          } else {
            throw new Error("Unable to fetch subregions");
          }
        } catch (error) {
          console.error("Error fetching subregions:", error);
        }
      } else {
        setSubregions([]);
      }
    }
    fetchSubregions();
  }, [selectedRegion]);

  const handleChange = (e) => {
    setSelectedRegion(e.target.value);
    setSelectedSubregion('');
    handleFilterChange(e.target.value, ''); 
  };

  const handleSubregionChange = (e) => {
    const selectedSubregionValue = e.target.value;
    setSelectedSubregion(selectedSubregionValue);
    handleFilterChange(selectedRegion, selectedSubregionValue); 
  };

  const handleSort = (e) => {
    handleSortChange(e.target.value);
  };

  return (
    <div className="filter">
      <select id="continent-filter" onChange={handleChange} value={selectedRegion} style={{marginRight: '25px'}}>
        <option value="">Filter by Region</option>
        {continents.map((continent, index) => (
          <option key={index} value={continent}>{continent}</option>
        ))}
      </select>
      {subregions.length > 0 && (
        <select id="subregion-filter" onChange={handleSubregionChange} value={selectedSubregion}style={{marginRight: '25px'}}>
          <option value="">Filter by Subregion</option>
          {subregions.map((subregion, index) => (
            <option key={index} value={subregion}>{subregion}</option>
          ))}
        </select>
      )}
      <select id="sort-filter" onChange={handleSort} defaultValue="">
        <option value="">Sort</option>
        {sortOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Filter;

