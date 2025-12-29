/**
 * @fileoverview Component for rendering
 * different components depending on which hyperlink is selected.
 * 
 * Used for Single Page Applications (SPAs) to show different
 * components when users navigate within the page.
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';

const NotFound = () => <h1>Page not Found</h1>;

/**
 * Returns an element that routes to
 * different pages of the application.
 */
export default function Contents() {
  return (
    /*
      Switch statement allows only the first match's
      component to be rendered, so order of Routes is important.
      The not found component must be last.
    */
    <Switch>
      {/* Allows the "/" path to render issues list */}
      <Redirect exact from="/" to="/issues" />
      <Route path="/issues" component={IssueList} />
      <Route path="/edit/:id" component={IssueEdit} />
      <Route path="/report" component={IssueReport} />
      <Route component={NotFound} />
    </Switch>
  );
}
