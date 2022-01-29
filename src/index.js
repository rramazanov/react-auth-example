import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';

import {history} from './common/routing';
import App from './app/app';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
