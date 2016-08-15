import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';

export default React.createClass({
  logout: function() {
    store.session.logout();
    //this should be listened to so that the user is redirected to the landing page
    //this should also be moved to the settings part on the user's profile, once you make it
    browserHistory.push(`/`);
  },
  render: function() {
    //potential icon <img className="nav-icon bone-icon" src="../../assets/bone.svg" alt="image of a cute dog-bone" role="button"/>
    return (
      <nav className="nav-component">
          <ul>
            <li className="li-third">
              <i className="nav-icon paw-icon fa fa-paw" aria-hidden="true"></i>
            </li>


            <li className="li-first">
              <i className="nav-icon user-icon fa fa-user" aria-hidden="true" onClick={this.logout}></i>
            </li>

            <li className="li-second">
              <i className="nav-icon fa fa-bullseye" aria-hidden="true"></i>
            </li>

          </ul>
        </nav>
      );
    }
});
