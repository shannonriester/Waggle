import React from 'react';
import { browswerHistory } from 'react-router';

import store from '../store';

export default React.createClass({
  login: function(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;

    store.session.login(username, password)
    this.props.hideModal();
    // browswerHistory.push(`/`);

  },
  signup: function(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    console.log(username);
    let password = this.refs.password.value;
    let password2 = this.refs.password2.value;

    if (password !== password2) {
      //do not let them login
      console.log('passwords don\'t match!');
    } else {
      store.session.signup(username, password)
    }
    this.props.hideModal();
  },
  hideModal: function() {
    this.props.hideModal();
  },
  render: function() {
    let modalContent;
    if (this.props.modal === 'login') {
      modalContent = (
        <form className="login-form" onSubmit={this.login}>
          <label htmlFor="input-username"></label>
          <input type="text" placeholder="username" ref="username" role="button" tabIndex="1" />
          <label htmlFor="input-password"></label>
          <input type="password" placeholder="password" ref="password" role="button" tabIndex="2" />
          <input type="submit" value="submit" ref="submit" role="button" tabIndex="3" />
          <input type="button" value="cancel" ref="cancel" role="button" tabIndex="4" onClick={this.hideModal}/>
        </form>
      );
    } else if (this.props.modal === 'signup') {
      modalContent = (
        <form className="signup-form" onSubmit={this.signup}>
          <label htmlFor="input-username"></label>
          <input type="text" placeholder="username" ref="username" role="button" tabIndex="1" />
          <label htmlFor="input-password"></label>
          <input type="password" placeholder="password" ref="password" tabIndex="2" />
          <label htmlFor="input-confirm-password"></label>
          <input type="password" placeholder="password" ref="password2" tabIndex="3" />
          <input type="submit" value="submit" ref="submit" role="button" tabIndex="4" />
          <input type="button" value="cancel" ref="cancel" role="button" tabIndex="5" onClick={this.hideModal}/>
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
