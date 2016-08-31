import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      checkins: store.checkinCollection.toJSON(),
      fetch: true,
      ipadView: false,
    }
  },
  messages: function() {
    browserHistory.push(`/messages`);
  },
  userProfile: function() {
    browserHistory.push(`/user/${store.session.get('username')}`);
  },
  searchResults: function() {
    browserHistory.push({pathname:`/search/`, query:{category: store.session.get('query')} });
  },
  changeNav: function() {
    if (window.innerWidth >= 775) {
      this.setState({ipadView: true});
    }
  },
  updateState: function() {
    if (store.session.get('username') && this.state.fetch) {
      store.checkinCollection.fetch();
      this.setState({
        checkins: store.checkinCollection.toJSON(),
        fetch: false,
      });
    }
  },
  componentWillMount: function() {
    if (!localStorage.authtoken) {
      browserHistory.push('/');
    }
  },
  componentDidMount: function() {
    if (store.session.get('username')) {
      store.checkinCollection.fetch();
      store.checkinCollection.deleteOldCheckins();
    }

    // window.addEventListener('resize', this.changeNav)
    store.session.on('change', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
  },
  render: function() {

    if (this.state.ipadView) {

    }


    return (
      <nav className="nav-component">
          <section className="header-title"><div className="logo-container" style={{backgroundImage:`url("/assets/dogHead_Red.svg")`}}></div><h1 className="waggle">Waggle</h1></section>

          <ul className="nav-ul">
            <li className="li-third" onClick={this.messages}>
              <i className="nav-icon messages-icon fa fa-comments-o" aria-hidden="true"></i>
              <p className="nav-icon-title">Messages</p>
            </li>

            <li className="li-first" onClick={this.userProfile}>
              <i className="nav-icon user-icon fa fa-user" aria-hidden="true"></i>
              <p className="nav-icon-title">Profile</p>
            </li>

            <li className="li-second" onClick={this.searchResults}>
              <i className="nav-icon fa fa-bullseye" aria-hidden="true"></i>
              <p className="nav-icon-title">Search</p>
            </li>

          </ul>
        </nav>
      );
    }
});
