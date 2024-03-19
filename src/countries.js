
import React, { useState, useEffect } from 'react';

export default function Countries({ searchQuery, selectedRegion, selectedSubregion, sortOption }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResultsFound, setSearchResultsFound] = useState(true);

  const url = 'https://restcountries.com/v3.1/all';

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCountries(data);
          setLoading(false);
        } else {
          throw new Error("Unable to fetch data");
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  

  useEffect(() => {
    let filtered = countries.filter(country => {
      return (
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedRegion === 'All' || country.region === selectedRegion) &&
        (selectedSubregion === '' || country.subregion === selectedSubregion)
      );
    });

    if (sortOption === 'Ascending by Area') {
      filtered.sort((a, b) => a.area - b.area);
    } else if (sortOption === 'Descending by Area') {
      filtered.sort((a, b) => b.area - a.area);
    } else if (sortOption === 'Ascending by Population') {
      filtered.sort((a, b) => parseInt(a.population) - parseInt(b.population));
    } else if (sortOption === 'Descending by Population') {
      filtered.sort((a, b) => parseInt(b.population) - parseInt(a.population));
    }
    setFilteredCountries(filtered);
    setSearchResultsFound(filtered.length > 0 || !searchQuery);
  }, [countries, searchQuery, selectedRegion, selectedSubregion, sortOption]);



  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }



  return (
    <div className='container'>
      <div className='list'>
        {searchResultsFound ? (
          filteredCountries.map(country => (
            <div key={country.name.common} className='countries-items'>
              <img src={country.flags?.png} alt={`Flag of ${country.name.common}`} />
              <h2>{country.name.common}</h2>
              <p><strong>Population: </strong>{country.population}</p>
              <p><strong>Region: </strong> {country.region}</p>
              <p><strong>Subregion: </strong>{country.subregion}</p>
              <p><strong>Capital: </strong>{country.capital}</p>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center' }}>No countries found.</div>
        )}
      </div>
    </div>
  );
}
