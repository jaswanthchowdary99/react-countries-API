import './App.css';
import Countries from './countries';
import Header from './header';
import SearchBar from './searchbar';
import Filter from './filter';
import React, { useState} from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All'); 
  const [selectedSubregion, setSelectedSubregion] = useState('');
  const [sortOption, setSortOption] = useState('');

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

  return (
    <div className="App">
      <Header />
      <div className="App-header">
        <div className="info">
          <SearchBar search={handleSearch} />
          <Filter
            handleFilterChange={handleFilterChange}
            handleSortChange={handleSortChange}
          />
        </div>
        <Countries
          searchQuery={searchQuery}
          selectedRegion={selectedRegion}
          selectedSubregion={selectedSubregion}
          sortOption={sortOption}
        />
      </div>
    </div>
  );
}

export default App;
