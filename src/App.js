import './App.css';
import Countries from './countries';
import Header from './header';
import SearchBar from './searchbar';
import Filter from './filter';
import React, { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (value) => {
    setSelectedRegion(value);
  };

  return (
    <div className="App">
      <Header/>
      <header className="App-header">
        <div className='info'>
        <SearchBar search={handleSearch} />
        <Filter handleFilterChange={handleFilterChange} />
        </div>
        <Countries searchQuery={searchQuery} selectedRegion={selectedRegion} />
        </header>
    </div>
  );
}

export default App;
