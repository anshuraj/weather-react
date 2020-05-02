import React from 'react';
import PropTypes from 'prop-types';

function WeatherDisplay({ data }) {
  return (
    <div>
      <h4>{data.name}</h4>
      <div className="row">
        <div className="small-6 columns">
          <div>
            <span className="temperature">{data.main.temp}</span>{' '}
            <span className="deg">&deg;C</span>
          </div>
          <div>{data.weather[0].description}</div>
          <div>Feels like {data.main.feels_like} &deg;C</div>
          <div>Min: {data.main.temp_min}&deg;C</div>
          <div>Max: {data.main.temp_max}&deg;C</div>
        </div>
      </div>
      <br />
      <div>Humidity {data.main.humidity}% </div>
      <div>Clouds {data.clouds.all}% </div>
      <div>
        Wind {data.wind.deg}&deg; {data.wind.speed} m/s{' '}
      </div>
      <div>Visibility {data.visibility} km </div>
    </div>
  );
}

WeatherDisplay.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WeatherDisplay;
