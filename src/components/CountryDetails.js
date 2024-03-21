import React, { useEffect, useState } from "react";
import { fetchCountries } from "./Countries";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';


function CountryInfo() {
  const { id } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        const country = data.find((country) => country.name.common === id);
        setCountryInfo(country);
      })
      .catch((error) => console.error("Error fetching country details:", error));
  }, [id]);
  if (!countryInfo) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        Loading....
      </div>
    );
  }

  return (
    <div className="country-info-container">
      <div className="btn">
      <Link className="button" to="/">
      <FontAwesomeIcon icon={faArrowLeftLong} style={{marginRight:'10px'}} /> Back
      </Link>
      </div>
      <div className="country-info-left">
        <img src={countryInfo.flags?.png} alt={`Flag of ${countryInfo.name}`} />
      </div>
      <div className="country-info-right">
        <h1>{countryInfo.name.common}</h1>
        <div className="secondColumn">
          <div className="country-info-right1">
            <p>
              <strong>Native Name: </strong>
              {Object.values(countryInfo.name?.official || "No data available")}
            </p>
            <p>
              <strong>Population: </strong>
              {countryInfo.population}
            </p>
            <p>
              <strong>Region: </strong>
              {countryInfo.region}
            </p>
            <p>
              <strong>Subregion: </strong>
              {countryInfo.subregion}
            </p>
            <p>
              <strong>Capital: </strong>
              {countryInfo.capital}
            </p>
          </div>
  
          <div className="country-info-right2">
            <p>
              <strong>Top Level Domain: </strong>
              {countryInfo.tld}
            </p>
            <p>
              <strong>Currencies: </strong>
              {Object.keys(countryInfo.currencies).join(", ")}
            </p>
            <p>
              <strong>Languages: </strong>
              {Object.values(countryInfo.languages).join(", ")}
            </p>
          </div>
        </div>
        
        <div className="countryBorders">
          <div>
            <strong>Country Borders</strong>:
            {countryInfo.borders && countryInfo.borders.length > 0 ? (
              countryInfo.borders.map((border, index) => (
                <button className="button1" key={index}>{border}</button>
              ))
            ) : (
              <span>No borders</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default CountryInfo;
