import React from 'react';
import { Router, browserHistory, hashHistory, IndexRoute, Route } from 'react-router';

import App from './Pages/App';
import LandingPage from './Pages/LandingPage';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
    </Route>
  </Router>
);

export default router;
