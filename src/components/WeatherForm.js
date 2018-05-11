import React from 'react';

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    let { location } = this.state;
    this.setState({location: ''});

    if(location.length > 0)
      this.props.onNewLocation(location);
  }
  
  handleChange = (e) => {
    this.setState({location: e.target.value});
  }

  render () {
    return (
      <div>
        <h3 className="text-center">Weather</h3>
        <form onSubmit={this.onFormSubmit}>
          <input
            type='text'
            value={this.state.location}
            onChange={this.handleChange}
            placeholder='Enter a location'>
          </input>
          <button className="hollow button expanded">Get weather</button>
        </form>
      </div>
    );
  }
}

export default WeatherForm;