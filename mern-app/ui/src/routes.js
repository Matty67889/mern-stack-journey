/**
 * @fileoverview A list of routes.
 *
 * Used for helping server render determine which component needs to have its
 * data fetched.
 */

import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';
import About from './About.jsx';
import NotFound from './NotFound.jsx';

const routes = [
  { path: '/issues', component: IssueList },
  { path: '/edit/:id', component: IssueEdit },
  { path: '/report', component: IssueReport },
  { path: '/about', component: About },
  { path: '*', component: NotFound },
]

export default routes;
