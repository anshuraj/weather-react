import React from 'react';

class WeatherDisplay extends React.Component {
  render () {
    let {
      current,
      location
    } = this.props;
    return (
      <div>
        <div>
          <h4>{location.name}{location.region ? ', ' + location.region : ''}, {location.country}</h4>
        </div>

        <div className="row">
          {current.condition &&
            <div className="small-6 columns">
              <div>
                <img src={current.condition.icon} alt="cloudiness" /> <br />
              </div>
              <div>{current.condition.text}</div>
            </div>
          }

          <div className="small-6 columns">
            <div><span className="temperature">{current.temp_c}</span> <span className="deg">&deg;C</span></div>
            <div>Feels like {current.feelslike_c} &deg;C</div>
          </div>
        </div>
        <br />

        <div>Precipitation {current.precip_mm} mm </div>
        <div>Humidity {current.humidity}% </div>
        <div>Clouds {current.cloud}% </div>
        <div>Wind {current.wind_dir} {current.wind_kph} kmph </div>
        <div>Visibility {current.vis_km} km </div>


        Last updated on {current.last_updated} <br />
      </div>
    );
  }
}

export default WeatherDisplay;