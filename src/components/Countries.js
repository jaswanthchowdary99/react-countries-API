import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Grid, Box } from '@mui/material';


const url = 'https://restcountries.com/v3.1/all';

export async function fetchCountries() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Unable to fetch data");
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
}

export default function Countries({ searchQuery, selectedRegion, selectedSubregion, sortOption,isDarkMode }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResultsFound, setSearchResultsFound] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        setError(error)
        setLoading(false);
      }
    }
    fetchData();
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
    return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
  }

  if (error) {
    return <Alert severity="error" style={{ margin: '20px auto', maxWidth: '600px' }}>Error: Unable to fetch data. Please try again later.</Alert>;
  }

  return (
    <Container>
      <Grid container spacing={10}>
        {searchResultsFound ? (
          filteredCountries.map(country => (
            <Grid item xs={12} sm={6} md={3} key={country.name.common}>
              <Link style={{textDecoration: 'none',color: 'black'}} className="link" to={`/country/${country.name.common}`}>
                <Box
                  sx={{
                    color: isDarkMode ? 'white' : 'black' ,
                    marginLeft:'-40px',
                    border: 'none',
                    borderRadius: '5px',
                    width:'260px',
                    height:'300px',
                    textAlign: 'left',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.336)' ,
                    display: 'flex',
                    flexDirection: 'column',
                    
                  }}
                >
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                <img src={country.flags?.png} alt={`Flag of ${country.name.common}`} style={{ width: '100%', height:'100%' }} />
              </div>
              <Box
                sx={{
                  padding: '10px',
                  marginTop:'-30px'
                }}
              >
                <Typography variant="h6" style={{marginBottom: '-10px'}}><h4>{country.name.common}</h4></Typography>
                <Typography style={{fontSize: '14px'}}><strong>Population: </strong>{country.population}</Typography>
                <Typography style={{fontSize: '14px'}}><strong>Region: </strong>{country.region}</Typography>
                <Typography style={{fontSize: '14px'}}><strong>Subregion: </strong>{country.subregion}</Typography>
                <Typography style={{fontSize: '14px'}}><strong>Capital: </strong>{country.capital}</Typography>
              </Box>
                </Box>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" style={{ textAlign: 'center', margin: '20px auto', maxWidth: '600px' }}>No countries found.</Typography>
        )}
      </Grid>
    </Container>
  );
}
