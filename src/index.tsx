import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';
import './styles/normalize.css';
import './styles/stylesVariables.css';

import App from './containers/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
