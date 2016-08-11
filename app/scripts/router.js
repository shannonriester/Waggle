import React from 'react';
import { Router, browswerHistory, Route } from 'react-router';

const router = (
  <Router history={browswerHistory}>
    <Route path="/" component={App} />
  </Router>
);

export default router;
