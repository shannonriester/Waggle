import React from 'react';
import { browserHistory } from 'react-router';
import _ from 'underscore';

import store from '../store';

export default React.createClass({
  login: function(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    username.toLowerCase();
    let password = this.refs.password.value;

    store.session.login(username, password);

    this.props.hideModal();
  },
  signup: function(e) {
    e.preventDefault();

    let username = this.refs.username.value;
    username.toLowerCase();
    let password = this.refs.password.value;
    let password2 = this.refs.password2.value;

    if (password !== password2 || username === '' || username === ' ' || password === '' || password === ' ') {
      //do not let them login
      console.log('passwords don\'t match or you didn\'t enter a username!');
    } else {
      store.session.signup(username, password);
    }

    this.props.hideModal();
  },
  hideModal: function(e) {
    if (_.toArray(e.target.classList).indexOf('modal-component') !== -1 || _.toArray(e.target.classList).indexOf('cancel-btn') !== -1 ) {
      this.props.hideModal();
    }
  },
  render: function() {
    let modalContent;
    if (this.props.content === 'login') {
      modalContent = (
        <form className="login-form" onSubmit={this.login}>
          <header className="modal-header">
            <input className="cancel-btn modal-btn" type="button" value="cancel" role="button" tabIndex="0" onClick={this.hideModal}/>
            <h2>Log in to Waggle</h2>
          </header>
          <main className="modal-body">
            <label htmlFor="input-username">username</label>
            <input className="user-info-input" type="text" placeholder="username" ref="username" role="button" tabIndex="1" />
            <label htmlFor="input-password">password</label>
            <input className="user-info-input" type="password" placeholder="password" ref="password" role="button" tabIndex="2" />
          </main>
          <footer className="modal-footer">
            <input className="submit-btn modal-btn" type="submit" value="submit" ref="submit" role="button" tabIndex="3" onSubmit={this.login} onClick={this.login} />
          </footer>
        </form>
      );
    } else if (this.props.content === 'sign up') {
      modalContent = (
        <form className="signup-form" onSubmit={this.signup}>
          <header className="modal-header">
            <h2>Hi. Sign Up!</h2>
            <input className="cancel-btn modal-btn" type="button" value="cancel" ref="cancel" role="button" tabIndex="0" onClick={this.hideModal}/>
          </header>
          <main className="modal-body">
            <label htmlFor="input-username">username</label>
            <input className="user-info-input" type="text" placeholder="username" ref="username" role="button" tabIndex="1" />
            <label htmlFor="input-password">password</label>
            <input className="user-info-input" type="password" placeholder="password" ref="password" tabIndex="2" />
            <label htmlFor="input-confirm-password">confirm password</label>
            <input className="user-info-input" type="password" placeholder="password" ref="password2" tabIndex="3" />
          </main>
          <footer className="modal-footer">
            <input className="submit-btn modal-btn" type="submit" value="submit" ref="submit" role="button" tabIndex="4" onSubmit={this.signup} onClick={this.signup}/>
          </footer>
        </form>
      );
    }
    return (
      <div className="modal-component" onClick={this.hideModal}>
          <div className="modal-content">
            {modalContent}
        </div>
      </div>
    );
  }
});
