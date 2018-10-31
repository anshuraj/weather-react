import React, { Fragment } from 'react';

import About from './About';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import Spinner from './Spinner';
import '../css/Weather.css';

const OPEN_WEATHER_MAP_URL = 'https://api.apixu.com/v1/current.json?key=21dc34c5a380401294682025171806';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      location: {},
    }
  }

  handleNewLocation = location => {
    const encodedLocation = encodeURIComponent(location);
    const requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
    let that = this;

    this.setState({isLoading: true});

    fetch(requestUrl)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => {
        if (response.location) {
          that.setState({
            location: response.location,
            current: response.current,
            isLoading: false
          });
        } else if (response.error) {
          that.setState({
            isLoading: false,
            temp: '',
            location: ''
          });
          alert(response.error.message);
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({
          position: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        })
        let { position } = this.state;
        this.handleNewLocation(position.latitude + ',' + position.longitude)
      });
    }
  }

  render() {
    const {
      current,
      location,
      isLoading,
    } = this.state;

    const loading = () => {
      if (isLoading) {
        return <Spinner />
      } else if (current.hasOwnProperty('temp_c') && location.hasOwnProperty('name')) {
        return (
          <WeatherDisplay
            location={location}
            current={current} />
        );
      }
    }

    return (
      <Fragment>
        <div className="small-centered medium-6 large-5 columns card">
          <WeatherForm onNewLocation={(e) => this.handleNewLocation(e)} />
          {loading()}
        </div>
        <About/>
      </Fragment>
    );
  }
}

Weather.defaultProps = {
  isLoading: false
}

export default Weather;
