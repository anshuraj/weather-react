import React from 'react';

class WeatherDisplay extends React.Component {
  render () {
    let {
      current,
      location
    } = this.props;
    return (
      <div className="text-center">
        <h4>Temperature in {location.name}
          {location.region ? ', ' + location.region : ''}, {location.country} is {current.temp_c} &deg;C
        </h4><br />
        Feels like {current.feelslike_c} &deg;C <br />
        Precipitation {current.precip_mm}mm <br />
        Humidity {current.humidity}% <br />
        Clouds {current.cloud}% <br />
        Wind {current.wind_kph} kmph <br />
        Visibility {current.vis_km}km <br />
        {current.condition ?
          <div>
            {current.condition.text} <img src={current.condition.icon} alt="cloudiness" /> <br /> 
          </div> :
          null
        }
        Last updated on {current.last_updated} <br />
      </div>
    );
  }
}

export default WeatherDisplay;