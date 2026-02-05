/**
 * @fileoverview Main app.
 */

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Page from '../src/Page.jsx';

const element = (
  <Router>
    <Page />
  </Router>
);

ReactDOM.render(element, document.getElementById('content'));

// used to accept changes made with HMR enabled
if (module.hot) {
  module.hot.accept();
}
