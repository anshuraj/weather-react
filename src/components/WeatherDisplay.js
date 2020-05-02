import React from 'react';

function WeatherDisplay({ current, location }) {
  return (
    <div>
      <h4>
        {location.name}
        {location.region ? ', ' + location.region : ''}, {location.country}
      </h4>
      <div className="row">
        {current && (
          <div className="small-6 columns">
            <div>
              {current.weather_icons.map((i) => (
                <img key={i} src={i} alt="icon" />
              ))}
            </div>
            {current.weather_descriptions.map((w) => (
              <div key={w}>{w}</div>
            ))}
          </div>
        )}

        <div className="small-6 columns">
          <div>
            <span className="temperature">{current.temperature}</span>{' '}
            <span className="deg">&deg;C</span>
          </div>
          <div>Feels like {current.feelslike} &deg;C</div>
        </div>
      </div>
      <br />
      <div>Precipitation {current.precip} mm </div>
      <div>Humidity {current.humidity}% </div>
      <div>Clouds {current.cloudcover}% </div>
      <div>
        Wind {current.wind_dir} {current.wind_speed} kmph{' '}
      </div>
      <div>Visibility {current.visibility} km </div>
      Last updated on {current.observation_time} <br />
    </div>
  );
}

export default WeatherDisplay;
