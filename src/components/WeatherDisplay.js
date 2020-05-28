import React from 'react';
import PropTypes from 'prop-types';

function WeatherDisplay({
  data: { clouds, main, name, sys, visibility, weather, wind },
  changeCity,
}) {
  return (
    <div className="card ">
      <div>
        <h4 style={{ display: 'inline-block', marginRight: '10px' }}>{name}</h4>
        <button
          onClick={changeCity}
          style={{ fontSize: '14px', cursor: 'pointer' }}
        >
          Change
        </button>
      </div>
      <div>
        <div className="grid">
          <div className="">
            <span className="temperature">{parseInt(main.temp)}</span>{' '}
            <span className="deg">&deg;C</span>
            <div>
              <div>Feels like {parseInt(main.feels_like)}&deg;</div>
              <span>Min: {parseInt(main.temp_min)}&deg;</span>
              <span>Max: {parseInt(main.temp_max)}&deg;</span>
            </div>
          </div>

          <div className="">
            <img
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            />
            <div>{weather[0].description}</div>
          </div>
          <div style={{ height: '50px' }}></div>
          <div style={{ height: '50px' }}></div>

          <span className="current">Humidity</span>
          <span>{main.humidity}%</span>

          <span className="current">Clouds</span>
          <span>{clouds.all}%</span>

          <span className="current">Wind</span>
          <span>
            {wind.deg}&deg; {wind.speed} m/s
          </span>
          <span className="current">Pressure</span>
          <span>{main.pressure} mBar</span>
          <span className="current">Visibility</span>
          <span>{visibility / 1000} km </span>
        </div>
      </div>
    </div>
  );
}

// WeatherDisplay.propTypes = {
//   clouds: PropTypes.object.isRequired,
//   main: PropTypes.object.isRequired,
//   name: PropTypes.object.isRequired,
//   sys: PropTypes.object.isRequired,
//   visibility: PropTypes.object.isRequired,
//   weather: PropTypes.object.isRequired,
//   wind: PropTypes.object.isRequired,
// };

export default WeatherDisplay;
