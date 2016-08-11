import React from 'react';
import { Router, browserHistory, Route } from 'react-router';

import App from './Components/App';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
);

export default router;
