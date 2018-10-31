import React, { Component } from 'react';
import '../css/Spinner.css';

/**
 * Loading component
 * Renders a loading spinner
 */
class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <div className="anim">
        </div>
      </div>
    );
  }
}

export default Spinner;