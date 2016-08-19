import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      authtoken: localStorage.authtoken,
    }
  },
  logout: function() {
    let prevQuery = store.session.get('query');
    store.session.logout(prevQuery);
    console.log(this.state.authtoken);
    // this.updateState();
    this.setState({authtoken:null});
    if (!this.state.authtoken) {
      browserHistory.push('/');
    }
    //the logout button should EVENTUALLY be moved to the settings part on the user's profile (once you make it)
  },
  userProfile: function() {
    browserHistory.push(`/user/${store.session.get('username')}`);
  },
  searchResults: function() {
    browserHistory.push({pathname:`/search/`, query:{category: store.session.get('query')} });
  },
  updateState: function() {
    this.setState({authtoken: localStorage.authtoken});
  },
  componentWillMount: function() {
    if (!this.state.authtoken) {
      browserHistory.push('/');
    }
  },
  componentDidMount: function() {
    store.session.on('change', this.updateState);
    console.log('component did mount auth', this.state.authtoken);
    if (!this.state.authtoken) {
      browserHistory.push('/');
    }
    console.log('component did mount auth', this.state.authtoken);
    // this.updateState();
    store.session.on('change', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
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
              <i className="nav-icon fa fa-bullseye" aria-hidden="true" onClick={this.searchResults}></i>
            </li>

          </ul>
        </nav>
      );
    }
});
