import React from 'react';

import store from '../../store';

export default React.createClass({
  signup3(e) {
    e.preventDefault();

    let email = this.refs.email.value;
    let username = this.refs.username.value;
    username = username.toLowerCase();

    let password = this.refs.password.value;
    let password2 = this.refs.password2.value;

    if (password !== password2 || username === '' || username === ' ' || password === '' || password === ' ') {
      console.log('passwords don\'t match or you didn\'t enter a username!');
      this.props.shakeModal();
    } else {
      store.session.set('email', email);
      store.session.set('username', username);
      store.session.set('password', password);

      this.props.signup3(email, username, password);
    }
  },
  componentDidMount: function() {
    this.refs.email.value = store.session.get('email');
    this.refs.username.value = store.session.get('username');
    // this.refs.password.value = store.session.get('password');
  },
  render() {
    return (

      <div>
        <form className="modal-body signup3" onSubmit={this.signup3}>

          <label htmlFor="input-username">Email</label>
          <input className="user-info-input signup-input" type="text" placeholder="email" ref="email" role="textbox" tabIndex="1" />

          <label htmlFor="input-username">Username</label>
          <input className="user-info-input signup-input" type="text" placeholder="username" ref="username" role="textbox" tabIndex="2" />

          <label htmlFor="input-password">Password</label>
          <input className="user-info-input signup-input" type="password" placeholder="password" ref="password" role="textbox" tabIndex="3" />

          <label htmlFor="input-confirm-password">Confirm password</label>
          <input className="user-info-input signup-input" type="password" placeholder="password" ref="password2" role="textbox" tabIndex="4" />

          <input className="submit-btn" type="submit" />

        </form>
        <footer className="modal-footer signup-footer">
          <button className="modal-btn" role="button" tabIndex="4" onClick={this.signup3}>Done</button>
          <button className="modal-btn" role="button" tabIndex="6" onClick={this.props.back}>Back</button>
        </footer>
      </div>
    );
  }
});
