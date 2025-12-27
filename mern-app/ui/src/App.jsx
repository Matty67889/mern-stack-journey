/**
 * @fileoverview Main app.
 */

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import IssueList from './IssueList.jsx';

const element = <IssueList />;
const x = 2;

ReactDOM.render(element, document.getElementById('content'));

// used to accept changes made with HMR enabled
if (module.hot) {
  module.hot.accept();
}
