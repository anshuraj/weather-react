import React, { useState, useEffect } from 'react';

import About from './About';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import Spinner from './Spinner';
import '../css/Weather.css';

const WEATHER_MAP_URL =
  'http://api.weatherstack.com/current?access_key=733bd20110d64d7502419d9e3356db65';

function Weather() {
  const [current, setCurrent] = useState({});
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleNewLocation = (location) => {
    const encodedLocation = encodeURIComponent(location);
    const requestUrl = `${WEATHER_MAP_URL}&query=${encodedLocation}`;

    setIsLoading(true);

    fetch(requestUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        setLocation(response.location || {});
        setCurrent(response.current || {});
        setIsLoading(false);
        if (response.error) {
          alert(response.error.message);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        handleNewLocation(pos.coords.latitude + ',' + pos.coords.longitude);
      });
    }
  }, []);

  const loading = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (
      current.hasOwnProperty('temperature') &&
      location.hasOwnProperty('name')
    ) {
      return <WeatherDisplay location={location} current={current} />;
    }
  };

  return (
    <>
      <div className="small-centered medium-6 large-5 columns card">
        <WeatherForm onNewLocation={handleNewLocation} />
        {loading()}
      </div>
      <About />
    </>
  );
}

Weather.defaultProps = {
  isLoading: false,
};

export default Weather;
