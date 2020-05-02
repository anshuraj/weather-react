import React, { useState } from 'react';
import PropTypes from 'prop-types';

function WeatherForm({ onNewLocation }) {
  const [location, setLocation] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    setLocation('');

    if (location.length > 0) onNewLocation({ city: location });
  };

  const handleChange = (e) => {
    const location = e.target.value;
    setLocation(location);
  };
  return (
    <div>
      <h3 className="text-center">Weather</h3>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          value={location}
          onChange={handleChange}
          placeholder="Enter a location"
        />
        <button className="hollow button expanded">Get weather</button>
      </form>
    </div>
  );
}

WeatherForm.propTypes = {
  onNewLocation: PropTypes.func.isRequired,
};

export default WeatherForm;
