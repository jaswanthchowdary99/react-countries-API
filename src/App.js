import './App.css';
import Countries from './components/Countries';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import React, { useState} from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import CountryInfo from './components/CountryDetails';

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
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={
          <div className="App">
        
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
      }/>
     <Route path='/country/:id' element={<CountryInfo/>}/>

    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
