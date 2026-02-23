/**
 * @fileoverview HTML template generator file.
 */

/**
 * Function for generating an HTML template that can
 * take in additional elements.
 */

import serialize from 'serialize-javascript';

export default function template(body, data) {
  return `<!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Issue Tracker Website</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      table.table-hover tr {
        cursor: pointer;
      }

      .panel-title a {
        display: block;
        width: 100%;
        cursor: pointer;
      }
    </style>
  </head>

  <body>
    <!-- Page generated from template -->
    <div id="content">${body}</div>
    <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>

    <script src="/env.js"></script>
    <script src="/vendor.bundle.js"></script>
    <script src="/app.bundle.js"></script>
  </body>`;
}
