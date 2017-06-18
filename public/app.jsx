var About = React.createClass({
  render: function () {
    return (
			<div className="bottom">A weather app developed by <a href="https://anshuraj.github.io">Anshu Raj</a></div>
    );
  }
});

var WeatherDisplay = React.createClass({
  render: function () {
    var {location, temp} = this.props;

    return (
      <h4 className="text-center">Weather in {location} is {temp} &deg;C</h4>
    );
  }
});

var WeatherForm = React.createClass({
  onFormSubmit: function (e) {
    e.preventDefault();

    var location = this.refs.location.value;
    this.refs.location.value = '';

    if(location.length > 0)
      this.props.onNewLocation(location);
  },
  render: function () {
    return (
      <div>
        <h1 className="text-center">Weather app</h1>
        <form onSubmit={this.onFormSubmit}>
          <input type='text' placeholder='Enter a location' ref='location'></input>
          <button className="hollow button expanded">Get weather</button>
        </form>
      </div>
    );
  }
});

var Weather = React.createClass({
  getDefaultProps: function () {
    return {
      isLoading: false
    };
  },
  getInitialState: function () {
		return {
			location: this.props.location,
      temp: this.props.temp
		};
	},
  handleNewLocation: function (location) {
    const OPEN_WEATHER_MAP_URL = 'https://api.apixu.com/v1/current.json?key=21dc34c5a380401294682025171806';
    var encodedLocation = encodeURIComponent(location);
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

    var that = this;

    this.setState({isLoading:true});

    fetch(requestUrl).then(function(response){
      return response.json();
    }).then(function(res){

      console.log(res);
      if(res.location){
        console.log('asdas');
        that.setState({
          location: location,
          temp: res.current.temp_c,
          isLoading: false
        });
      } else if(res.error){
        that.setState({isLoading:false, temp: '', location: ''});
        alert(res.error.message);
      }
    });
  },
  render: function () {
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
          <WeatherForm onNewLocation={this.handleNewLocation}/>
          {loading()}
        </div>
        <About/>
      </div>
    );
  }
});

ReactDOM.render(
  <Weather/>,
  document.getElementById('app')
);
