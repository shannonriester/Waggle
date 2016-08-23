import React from 'react';
import { browserHistory } from 'react-router';
import _ from 'underscore';
import $ from 'jquery';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      username: null,
      shakeModal: false,
    }
  },
  login: function(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    username.toLowerCase();

    store.session.login(username, password);

    if (this.state.username) {
      this.props.hideModal();
    }
    browserHistory.push({pathname:`/search/`, query:{category: store.session.get('query')} });
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

    if (this.state.username) {
      this.props.hideModal();
    } else {
      this.shakeModal();
    }
  },
  shakeModal: function() {

  },
  hideModal: function(e) {
    if (_.toArray(e.target.classList).indexOf('modal-component') !== -1 || _.toArray(e.target.classList).indexOf('cancel-btn') !== -1 ) {
      this.props.hideModal();
    }
  },
  updateState: function() {
    this.setState({username:store.session.get('username')});
  },
  componentDidMount: function() {
    store.session.on('change', this.updateState);

    // this.refs.birthday.datePicker({
    //   changeMonth: true,
    //   changeYear: true,
    // });
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
  },
  render: function() {
    let animations = '';
    if (this.state.shakeModal) {
      animations = 'shake';
    }

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
            <input className="user-info-input" type="text" placeholder="username" ref="username" role="textbox" tabIndex="1" />
            <label htmlFor="input-password">password</label>
            <input className="user-info-input" type="password" placeholder="password" ref="password" role="textbox" tabIndex="2" />
          </main>
          <footer className="modal-footer">
            <button className="modal-btn" role="button" tabIndex="3" onSubmit={this.login} onClick={this.login}>Login</button>
            <input className="submit-btn" type="submit" value="submit" role="button" onSubmit={this.login} />
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
            <label htmlFor="input-username">Email</label>
            <input className="user-info-input" type="text" placeholder="email" ref="email" role="textbox" tabIndex="" />

            <label htmlFor="input-username">First name:</label>
            <input className="user-info-input" type="text" placeholder="email" ref="firstName" role="textbox" tabIndex="" />

            <label htmlFor="input-username">Last name:</label>
            <input className="user-info-input" type="text" placeholder="email" ref="lastName" role="textbox" tabIndex="" />

            <label htmlFor="input-username">Birthday</label>
            <input className="user-info-input" type="text" placeholder="email" ref="birthday" role="textbox" tabIndex="" />

            <label htmlFor="input-username">username</label>
            <input className="user-info-input" type="text" placeholder="username" ref="username" role="textbox" tabIndex="" />
            <label htmlFor="input-password">password</label>
            <input className="user-info-input" type="password" placeholder="password" ref="password" role="textbox" tabIndex="" />
            <label htmlFor="input-confirm-password">confirm password</label>
            <input className="user-info-input" type="password" placeholder="password" ref="password2" role="textbox" tabIndex="" />
          </main>
          <footer className="modal-footer">
            <button className="modal-btn" role="button" tabIndex="3" onSubmit={this.signup} onClick={this.signup}>Sign up</button>
            <input className="submit-btn" type="submit" value="submit" role="button" onSubmit={this.signup} />
          </footer>
        </form>
      );
    }
    return (
      <div className="modal-component" onClick={this.hideModal}>
          <div className="modal-content" id={animations}>
            {modalContent}
        </div>
      </div>
    );
  }
});
