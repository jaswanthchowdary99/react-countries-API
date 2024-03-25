import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { fetchCountries } from './Countries'; 

function Filter({ handleFilterChange, handleSortChange, isDarkMode }) {
  const [subregions, setSubregions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubregion, setSelectedSubregion] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState('');

  const continents = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const sortOptions = ['Ascending by Area', 'Descending by Area', 'Ascending by Population', 'Descending by Population'];

  useEffect(() => {
    async function fetchSubregions() {
      if (selectedRegion !== '') {
        try {
          const countries = await fetchCountries(); 
          const filteredCountries = countries.filter(country => country.region === selectedRegion);
          const uniqueSubregions = Array.from(new Set(filteredCountries.map(country => country.subregion)));
          setSubregions(uniqueSubregions);
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
    setSelectedSortOption(e.target.value);
    handleSortChange(e.target.value);
  };

  return (
    <div className="filter" style={{ display: 'flex' }}>
      <Select
        id="continent-filter"
        value={selectedRegion}
        onChange={handleChange}
        style={{ marginRight: '25px', width: '150px', fontSize: '14px', color: isDarkMode ? 'white' : 'black' }}
        displayEmpty  
      >
        <MenuItem value="" style={{ color: isDarkMode ? 'white' : 'black', backgroundColor: isDarkMode ? 'rgb(32,44,54)' : 'transparent' }}>Filter by Region</MenuItem>
        {continents.map((continent, index) => (
          <MenuItem key={index} value={continent} style={{ color: isDarkMode ? 'white' : 'black', backgroundColor: isDarkMode ? 'rgb(32,44,54)' : 'transparent' }}>{continent}</MenuItem>
        ))}
      </Select>

      <Select
        id="subregion-filter"
        value={selectedSubregion}
        onChange={handleSubregionChange}
        style={{ marginRight: '25px', width: '180px', fontSize: '14px', color: isDarkMode ? 'white' : 'black' }}
        displayEmpty  
      >
        <MenuItem value="" style={{ color: isDarkMode ? 'white' : 'black', backgroundColor: isDarkMode ? 'rgb(32,44,54)' : 'transparent' }}>Filter by Subregion</MenuItem>
        {subregions.map((subregion, index) => (
          <MenuItem key={index} value={subregion} style={{ color: isDarkMode ? 'white' : 'black', backgroundColor: isDarkMode ? 'rgb(32,44,54)' : 'transparent' }}>{subregion}</MenuItem>
        ))}
      </Select>

      <Select
        id="sort-filter"
        value={selectedSortOption}
        onChange={handleSort}
        style={{ width: '240px', fontSize: '14px', color: isDarkMode ? 'white' : 'black' }}
        displayEmpty  
      >
        <MenuItem value="" style={{ color: isDarkMode ? 'white' : 'black', backgroundColor: isDarkMode ? 'rgb(32,44,54)' : 'transparent' }}>Sort</MenuItem>
        {sortOptions.map((option, index) => (
          <MenuItem key={index} value={option} style={{ color: isDarkMode ? 'white' : 'black', backgroundColor: isDarkMode ? 'rgb(32,44,54)' : 'transparent' }}>{option}</MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default Filter;
