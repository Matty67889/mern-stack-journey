/**
 * @fileoverview Server side rendering file.
 */

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const About = require('./About.js').default; // default for
// compatibility between import/export and require/module paradigms
const template = require('./template.js');

/**
 * Renders the About component with the HTML template.
 */
function render(req, res) {
  const body = ReactDOMServer.renderToString(
    React.createElement(About),
  );
  res.send(template(body));
}

module.exports = render;
