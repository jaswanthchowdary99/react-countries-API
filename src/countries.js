import React, { useState, useEffect } from 'react';

export default function Countries({ searchQuery, selectedRegion }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true); 

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
        (selectedRegion === 'All' || country.region === selectedRegion)
      );
    });
    setFilteredCountries(filtered);
  }, [countries, searchQuery, selectedRegion]);

  
  useEffect(() => {
    if (!searchQuery && !selectedRegion) {
      setFilteredCountries(countries);
    }
  }, [searchQuery, selectedRegion, countries]);


   if (loading) {
    return <div style={{textAlign: 'center'}}>Loading...</div>; 
  }

  return (
    <div className='container'>
      <div className='list'>
        {filteredCountries.length === 0 ? (
          <div style={{textAlign: 'center'}}>No countries found.</div>
        ) : (
          filteredCountries.map(country => (
            <div key={country.name.common} className='countries-items'>
              <img src={country.flags?.png} alt={`Flag of ${country.name.common}`} />
              <h2>{country.name.common}</h2>
              <p><strong>Population: </strong>{country.population}</p>
              <p><strong>Region: </strong> {country.region}</p>
              <p><strong>Capital: </strong>{country.capital}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}