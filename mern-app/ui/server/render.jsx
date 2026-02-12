/**
 * @fileoverview Server side rendering file.
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import About from '../src/About.jsx';
import template from './template.js';

/**
 * Renders the About component with the HTML template.
 */
function render(req, res) {
  const body = ReactDOMServer.renderToString(<About />);
  res.send(template(body));
}

export default render;
