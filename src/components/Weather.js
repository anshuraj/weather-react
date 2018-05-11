import React from 'react';
import About from './About';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import Spinner from './Spinner';
import '../css/Weather.css';

class Weather extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      current: {},
      location: {},
    }
  }
  
  handleNewLocation (location) {
    const OPEN_WEATHER_MAP_URL = 'https://api.apixu.com/v1/current.json?key=21dc34c5a380401294682025171806';
    var encodedLocation = encodeURIComponent(location);
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
    
    var that = this;

    this.setState({isLoading: true});
  
    fetch(requestUrl).then(function(response){
      return response.json();
    }).then(function(res){
    
      if (res.location){
        that.setState({
          location: res.location,
          current: res.current,
          isLoading: false
        });
      } else if(res.error){
        that.setState({isLoading:false, temp: '', location: ''});
        alert(res.error.message);
      }
    });
  }

  render () {
    var {
      current,
      location,
      isLoading,
    } = this.state;
    function loading () {
      if(isLoading){
        return <Spinner />
      } else if(current.hasOwnProperty('temp_c') && location.hasOwnProperty('name')){
        return (
          <WeatherDisplay
            location={location}
            current={current} />
        );
      }
    }
    
    return (
      <div>
        <div className="small-centered medium-6 large-5 columns card">
          <WeatherForm onNewLocation={(e) => this.handleNewLocation(e)} />
          {loading()}
        </div>
        <About/>
      </div>
    );
  }
}

Weather.defaultProps = {
  isLoading: false
}

export default Weather;
