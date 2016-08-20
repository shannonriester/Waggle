import React from 'react';
import { Router, browserHistory, hashHistory, IndexRoute, Route } from 'react-router';

import App from './Pages/App';
import LandingPage from './Pages/LandingPage';
import SessionModal from './Components/SessionModal';
import ResultsPage from './Pages/ResultsPage';
import PlaceItemPage from './Pages/PlaceItemPage';
import ProfilePage from './Pages/ProfilePage';
import EditProfilePage from './Pages/ProfilePage';
import SettingsPage from './Pages/SettingsPage';
import MessageHistoryPage from './Pages/MessageHistoryPage';
import MessagePage from './Pages/MessagePage';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={LandingPage}>
      <IndexRoute component={LandingPage}/>
    </Route>
    <Route path="search" component={ResultsPage}/>
    <Route path="places/:placeId" component={PlaceItemPage}/>
    <Route path="user/:userId" component={ProfilePage}/>
    <Route path="messages" component={MessageHistoryPage}/>
    <Route path="messages/:messageId" component={MessagePage}/>
    <Route path="messages/newMessage" component={MessagePage}/>
    <Route path="settings" component={SettingsPage}/>
  </Router>
);

export default router;
