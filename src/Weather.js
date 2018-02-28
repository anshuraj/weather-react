import React from 'react';
import './Weather.css';

class About extends React.Component {
  render () {
    return (
			<div className="bottom">A weather app developed by <a href="https://anshuraj.github.io">Anshu Raj</a></div>
    );
  } 
}

class WeatherDisplay extends React.Component {
  render () {
    var {location, temp} = this.props;

    return (
      <h4 className="text-center">Weather in {location} is {temp} &deg;C</h4>
    );
  }
}

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: ''};

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  
  onFormSubmit (e) {
    e.preventDefault();
    var location = this.state.location;
    this.setState({location: ''});

    if(location.length > 0)
      this.props.onNewLocation(location);
  }
  
  handleChange (e) {
    this.setState({location: e.target.value});
  }

  render () {
    return (
      <div>
        <h1 className="text-center">Weather app</h1>
        <form onSubmit={this.onFormSubmit}>
          <input type='text' placeholder='Enter a location' value={this.state.location} onChange={this.handleChange}></input>
          <button className="hollow button expanded">Get weather</button>
        </form>
      </div>
    );
  }
}

class Weather extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      location: '',
      temp: ''
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
          location: res.location.name,
          temp: res.current.temp_c,
          isLoading: false
        });
      } else if(res.error){
        that.setState({isLoading:false, temp: '', location: ''});
        alert(res.error.message);
      }
    });
  }
  render () {
    var {isLoading, location, temp} = this.state;
    function loading () {
      if(isLoading){
        return <h3>Fetching weather...</h3>
      } else if(temp && location){
        return <WeatherDisplay location={location} temp={temp}/>
      }
    }
    
    return (
      <div>
        <div className="small-centered medium-6 large-5 columns card">
        
          {/* <WeatherForm onNewLocation={this.handleNewLocation.bind(this)}/> */}
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
