import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      checkins: store.checkinCollection.toJSON(),
      matches: store.checkinCollection.toJSON(),
      messages: store.messagesCollection.toJSON(),
      // places: store.placesCollection.toJSON(),
      users: store.userCollection.toJSON(),
      session: store.session.toJSON(),
      authtoken: localStorage.authtoken,
      // currentRoute: this.props.params.
    }
  },
  logout: function() {
    // let prevQuery = store.session.get('query');
    // store.session.logout(prevQuery);
    // this.updateState();
    // this.setState({authtoken:localStorage.authtoken})
    // localStorage.removeItem('authtoken');
    // this.updateState();
    //the logout button should EVENTUALLY be moved to the settings part on the user's profile (once you make it)
  },
  messages: function() {
    browserHistory.push(`/messages`)
  },
  userProfile: function() {
    browserHistory.push(`/user/${store.session.get('username')}`);
  },
  searchResults: function() {
    browserHistory.push({pathname:`/search/`, query:{category: store.session.get('query')} });
  },
  updateState: function() {
    if (!this.state.authtoken) {
      browserHistory.push('/');
    } else {
      this.setState({
        checkins: store.checkinCollection.toJSON(),
        matches: store.checkinCollection.toJSON(),
        messages: store.messagesCollection.toJSON(),
        users: store.userCollection.toJSON(),
        session: store.session.toJSON(),
        authtoken: localStorage.authtoken,
      });
    }
  },
  componentWillMount: function() {
    if (!this.state.authtoken) {
      browserHistory.push('/');
    }
  },
  componentDidMount: function() {
  if (!this.state.authtoken) {
    browserHistory.push('/');
  }
  store.checkinCollection.fetch();
  // store.messagesCollection.fetch();
  store.session.on('change', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
  },
  render: function() {
    //<i className="nav-icon paw-icon fa fa-paw" aria-hidden="true" onClick={this.logout}></i>
    return (
      <nav className="nav-component">
          <ul>
            <li className="li-third">
              <i className="nav-icon messages-icon fa fa-comments-o" aria-hidden="true" onClick={this.messages}></i>
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
