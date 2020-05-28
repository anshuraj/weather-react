import React, { useState, useEffect } from 'react';

import About from './About';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import Spinner from './Spinner';
import '../css/Weather.css';

const WEATHER_MAP_URL =
  'https://api.openweathermap.org/data/2.5/weather?appid=346174a5d0c90da6a254f1ca2fd936aa&units=metric';

function Weather() {
  const [data, setData] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewLocation = ({ city, lat, lon }) => {
    const requestUrl = `${WEATHER_MAP_URL}${city ? `&q=${city}` : ''}${
      lat && lon ? `&lat=${lat}&lon=${lon}` : ''
    }`;
    setIsLoading(true);

    fetch('/weather-react/test.json')
      .then((res) => res.json())
      .then((response) => {
        if (response.cod !== 200) {
          alert(response.message);
        } else {
          setData(response || {});
          setShowForm(false);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        handleNewLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      });
    }
  }, []);

  const loading = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (data.hasOwnProperty('main')) {
      return (
        <WeatherDisplay data={data} changeCity={() => setShowForm(true)} />
      );
    }
  };

  return (
    <>
      <div className="small-centered medium-6 large-5 columns">
        {showForm && <WeatherForm onNewLocation={handleNewLocation} />}
        {!showForm && loading()}
      </div>
    </>
  );
}

Weather.defaultProps = {
  isLoading: false,
};

export default Weather;
