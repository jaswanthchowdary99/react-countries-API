import './App.css';
import Countries from './components/Countries';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CountryInfo from './components/CountryDetails';
import { Container, Grid } from '@mui/material';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedSubregion, setSelectedSubregion] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (region, subregion) => {
    if (selectedRegion === region) {
      setSelectedSubregion(subregion);
    } else {
      setSelectedRegion(region);
      setSelectedSubregion(subregion);
    }
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: isDarkMode ? 'rgb(32,44,54)' : 'white', color: isDarkMode ? 'white' : 'black', minHeight: '100vh' }}>
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <Routes>
          <Route
            path='/'
            element={
              <Container>
                <div className="App">
                  <Grid container spacing={3} sx={{ margin: '40px 0 40px -40px' }}>
                    <Grid item xs={12} md={6}>
                      <SearchBar search={handleSearch} isDarkMode={isDarkMode} /> 
                    </Grid>
                    <Grid item xs={12} md={6} >
                      <Filter
                        handleFilterChange={handleFilterChange}
                        handleSortChange={handleSortChange}
                        isDarkMode={isDarkMode} 
                      />
                    </Grid>
                  </Grid>
                  <Countries
                    searchQuery={searchQuery}
                    selectedRegion={selectedRegion}
                    selectedSubregion={selectedSubregion}
                    sortOption={sortOption}
                    isDarkMode={isDarkMode} 
                  />
                </div>
              </Container>
            }
          />
          <Route path='/country/:id' element={<CountryInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
