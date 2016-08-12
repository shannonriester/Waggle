import React from 'react';

import store from '../store';

export default React.createClass({
  login: function() {
    let username = this.refs.username;
    let password = this.refs.password;

    if (password !== password2) {
      //do not let them login
    } else {
      store.session.login(username, password)
    }
  },
  signup: function() {
    let username = this.refs.username;
    let password = this.refs.password;
    let password2 = this.refs.password2;

    if (password !== password2) {
      //do not let them login
    } else {
      store.session.signup(username, password)
    }
  },
  render: function() {
    let modalContent;
    if (this.props.modal === 'login') {
      modalContent = (
        <form className="login-form" onSubmit={this.login}>
          <label htmlFor="input-username"></label>
          <input type="text" placeholder="username" ref="username" role="button" tabIndex="0" />
          <label htmlFor="input-password"></label>
          <input type="password" placeholder="password" ref="password" role="button" tabIndex="1" />
          <input type="submit" value="submit" ref="submit" role="button" tabIndex="2" />
          <input type="button" value="cancel" ref="cancel" role="button" tabIndex="3" />
        </form>
      );
    } else if (this.props.modal === 'signup') {
      modalContent = (
        <form className="signup-form" onSubmit={this.signup}>
          <label htmlFor="input-username"></label>
          <input type="text" placeholder="username" ref="username" role="button" tabIndex="0" />
          <label htmlFor="input-password"></label>
          <input type="password" placeholder="password" ref="password" tabIndex="1" />
          <label htmlFor="input-confirm-password"></label>
          <input type="password" placeholder="password2" ref="password2" tabIndex="2" />
          <input type="submit" value="submit" ref="submit" role="button" tabIndex="3" />
          <input type="button" value="cancel" ref="cancel" role="button" tabIndex="4" />
        </form>
      );
    }
    return (
      <div className="modal-component">
        <div className="modal-content">
          {modalContent}
        </div>
      </div>
    );
  }
});
