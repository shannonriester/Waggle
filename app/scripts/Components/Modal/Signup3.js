import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      email: undefined,
      username: undefined,
      password: undefined,
    }
  },
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

      this.props.signup3(email, username, password);
      this.setState({email: email, username: username, password: password});

    }
  },
  render() {
    return (
      <form className="modal-body signup3" onSubmit={this.signup3}>
        <label htmlFor="input-username">Email</label>
        <input className="user-info-input" type="text" placeholder="email" ref="email" role="textbox" tabIndex="1" />

        <label htmlFor="input-username">Username</label>
        <input className="user-info-input" type="text" placeholder="username" ref="username" role="textbox" tabIndex="2" />

        <label htmlFor="input-password">Password</label>
        <input className="user-info-input" type="password" placeholder="password" ref="password" role="textbox" tabIndex="3" />

        <label htmlFor="input-confirm-password">Confirm password</label>
        <input className="user-info-input" type="password" placeholder="password" ref="password2" role="textbox" tabIndex="4" />

        <input className="submit-btn" type="submit" value="submit" role="button" onSubmit={this.signup3} />
      </form>
    );
  }
});
