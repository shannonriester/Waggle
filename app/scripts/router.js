import React from 'react';
import { Router, browserHistory, hashHistory, IndexRoute, Route } from 'react-router';

import App from './Pages/App';
import LandingPage from './Pages/LandingPage';
import SessionModal from './Components/SessionModal';
import ResultsPage from './Pages/ResultsPage';
import ResultItemPage from './Pages/ResultItemPage';
import ProfilePage from './Pages/ProfilePage';
import EditProfilePage from './Pages/ProfilePage';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={LandingPage}>
      <IndexRoute component={LandingPage} />
      <Route path="login" component={SessionModal} />
      <Route path="signup" component={SessionModal} />
    </Route>
    <Route path="search" component={ResultsPage} />
    <Route path="places/:placeId" component={ResultItemPage}/>
    <Route path="user/:userId" component={ProfilePage} >
      <Route path="/edit" component={EditProfilePage} />
    </Route>
  </Router>
);

export default router;
