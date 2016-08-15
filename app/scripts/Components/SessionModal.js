import React from 'react';
import { browserHistory } from 'react-router';
import _ from 'underscore';

import store from '../store';

export default React.createClass({
  login: function(e) {
    e.preventDefault();
    // this.props.heroToggle();
    console.log(this);
    let username = this.refs.username.value;
    username.toLowerCase();
    let password = this.refs.password.value;

    store.session.login(username, password)
    this.props.hideModal();
    console.log('query on SessionModal', store.session.get('query'));
    browserHistory.push(`/search/${store.session.get('query')}`);
  },
  signup: function(e) {
    e.preventDefault();

    let username = this.refs.username.value;
    username.toLowerCase();
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
    browserHistory.push(`/search/${store.session.get('query')}`);
    // browserHistory.push(`/user/:username`);
  },
  hideModal: function(e) {
    if (_.toArray(e.target.classList).indexOf('modal-component') !== -1 || _.toArray(e.target.classList).indexOf('cancel') !== -1 ) {
      this.props.hideModal();
    }
  },
  render: function() {
    let modalContent;
    console.log('this modal ', this);
    if (this.props.content === 'login') {
      modalContent = (
        <form className="login-form" onSubmit={this.login}>
          <label htmlFor="input-username"></label>
          <input className="user-info-input" type="text" placeholder="username" ref="username" role="button" tabIndex="1" />
          <label htmlFor="input-password"></label>
          <input className="user-info-input" type="password" placeholder="password" ref="password" role="button" tabIndex="2" />
          <section className="button-section">
            <input className="modal-btn" type="submit" value="submit" ref="submit" role="button" tabIndex="3" onSubmit={this.login} onClick={this.login} />
            <input className="cancel modal-btn" type="button" value="cancel" role="button" tabIndex="4" onClick={this.hideModal}/>
          </section>
        </form>
      );
    } else if (this.props.content === 'sign up') {
      modalContent = (
        <form className="signup-form" onSubmit={this.signup}>
          <label htmlFor="input-username"></label>
          <input className="user-info-input" type="text" placeholder="username" ref="username" role="button" tabIndex="1" />
          <label htmlFor="input-password"></label>
          <input className="user-info-input" type="password" placeholder="password" ref="password" tabIndex="2" />
          <label htmlFor="input-confirm-password"></label>
          <input className="user-info-input" type="password" placeholder="password" ref="password2" tabIndex="3" />
          <section className="button-section">
            <input className="modal-btn" type="submit" value="submit" ref="submit" role="button" tabIndex="4" onSubmit={this.signup} onClick={this.signup}/>
            <input className="cancel modal-btn" type="button" value="cancel" ref="cancel" role="button" tabIndex="5" onClick={this.hideModal}/>
          </section>
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
