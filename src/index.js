import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './Weather';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Weather />, document.getElementById('app'));
registerServiceWorker();
