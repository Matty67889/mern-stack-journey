/**
 * @fileoverview Server side rendering file.
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import About from '../src/About.jsx';
import Page from '../src/Page.jsx';
import template from './template.js';
import store from '../src/store.js';

/**
 * Renders the About component with the HTML template.
 */
async function render(req, res) {
  const initialData = About.fetchData();
  store.initialData = initialData;

  const element = (
    <StaticRouter location={req.url} context={{}}>
      <Page />
    </StaticRouter>
  )
  const body = ReactDOMServer.renderToString(element);
  res.send(template(body, initialData));
}

export default render;
