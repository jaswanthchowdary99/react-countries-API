import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

function SearchBar({ search, isDarkMode }) {
  const handleSearch = (e) => {
    search(e.target.value);
  };

  return (
    <div className='searchBar'>
      <TextField
        placeholder='Search for a country'
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search style={{ color: isDarkMode ? 'white' : 'black' }} /> 
            </InputAdornment>
          ),
          style: {
            color: isDarkMode ? 'white' : 'black',
          },
        }}
      />
    </div>
  );
}

export default SearchBar;
