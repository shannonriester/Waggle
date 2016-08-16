import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      session: store.session.get('username'),
    }
  },
  componentDidMount: function() {
    this.setState({session: store.session.get('username')});
  },
  logout: function() {
    store.session.logout();
    //the logout button should EVENTUALLY be moved to the settings part on the user's profile (once you make it)
  },
  userProfile: function() {
    console.log('clicked userprofile');
    console.log(store.session.get('username'));
    browserHistory.push(`/user/${store.session.get('username')}`);
  },
  render: function() {
    //potential icon <img className="nav-icon bone-icon" src="../../assets/bone.svg" alt="image of a cute dog-bone" role="button"/>
    return (
      <nav className="nav-component">
          <ul>
            <li className="li-third">
              <i className="nav-icon paw-icon fa fa-paw" aria-hidden="true" onClick={this.logout}></i>
            </li>


            <li className="li-first">
              <i className="nav-icon user-icon fa fa-user" aria-hidden="true" onClick={this.userProfile}></i>
            </li>

            <li className="li-second">
              <i className="nav-icon fa fa-bullseye" aria-hidden="true"></i>
            </li>

          </ul>
        </nav>
      );
    }
});
