/**
 * @fileoverview Components for rendering the navigation bar.
 * 
 * Links are routed using the HashRouter, meaning that links will have the following form:
 * - home page will be "/"
 * - other pages (views) will be "/#/<page_name>"
 */

import React from 'react';

import Contents from './Contents.jsx';

function NavBar() {
  return (
    <nav>
      <a href="/">Home</a>
      {' | '}
      <a href="/#/issues">Issue List</a>
      {' | '}
      <a href="/#/report">Report</a>
    </nav>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}
