import React from 'react';
import { Router, browserHistory, hashHistory, Route } from 'react-router';

import App from './Pages/App';
import LandingPage from './Pages/LandingPage';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/entry" component={LandingPage} />
    </Route>
  </Router>
);

export default router;
