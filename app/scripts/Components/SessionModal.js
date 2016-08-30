import React from 'react';
import { browserHistory } from 'react-router';
import _ from 'underscore';

import store from '../store';
import Signup1 from './Modal/Signup1';
import Signup2 from './Modal/Signup2';
import Signup3 from './Modal/Signup3';

export default React.createClass({
  getInitialState: function() {
    return {
      shakeModal: false,
      value0 : new Date(),
      form: 'signup1',
      username: undefined,
      email: undefined,
      password: undefined,
      dogName: undefined,
      dogAge: undefined,
      dogBreed: undefined,
      firstName: undefined,
      lastName: undefined,
      age: undefined,
    }
  },
  login: function(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    username.toLowerCase();

    store.session.login(username, password);
    if (localStorage.authtoken) {
      this.props.hideModal();
    } else {
      this.shakeModal();
    }
  },
  back: function(e) {
    e.preventDefault();
    if (this.state.form === 'signup3') {
      this.setState({form: 'signup2'});
    } else {
      this.setState({form: 'signup1'});
    }
  },
  signupBtn: function(e) {
    e.preventDefault();
    let firstName = store.session.get('firstName');
    let lastName = store.session.get('lastName');
    let age = store.session.get('age');

    let dogName = store.session.get('dogName');
    let dogAge = store.session.get('dogAge');
    let dogBreed = store.session.get('dogBreed');


    let username = store.session.get('username');
    let email = store.session.get('email');
    let password = store.session.get('password');

      store.session.signup(
        username,
        password,
        email,
        firstName,
        lastName,
        age,
        dogName,
        dogAge,
        dogBreed);
  },
  signup3: function(email, username, password) {
      store.session.signup(
        username,
        password,
        email,
        this.state.firstName,
        this.state.lastName,
        this.state.age,
        this.state.dogName,
        this.state.dogAge,
        this.state.dogBreed);
  },
  signup2: function(dogName, dogAge, dogBreed) {
    this.setState({
      form: 'signup3',
      dogName: dogName,
      dogAge: dogAge,
      dogBreed: dogBreed,
    });
  },
  signup1: function(firstName, lastName, age) {
    this.setState({
      form: 'signup2',
      firstName: firstName,
      lastName: lastName,
      age: age,
    });
  },
  shakeModal: function() {
    console.log('try to shake modal!');

    this.setState({shakeModal: true});
    window.setTimeout(() => {
      this.setState({shakeModal: false});
    }, 1500);
  },
  hideModal: function(e) {
    if (_.toArray(e.target.classList).indexOf('modal-content') !== -1 || _.toArray(e.target.classList).indexOf('cancel-btn') !== -1 ) {
      this.props.hideModal();
      browserHistory.push('/');
    }
  },
  updateState: function() {
    this.setState({username: store.session.get('username')});
  },
  componentDidMount: function() {
    store.session.on('change', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
  },
  render: function() {
    let animations;
    let form;
    let footer;
    let checkInfo;
    let modalContent;
    let hideMe;

    if (this.state.shakeModal) {
      animations = 'shake';
      hideMe = 'hide-me';
      checkInfo = (<h2 className="check-info">Check your password...?</h2>);
    }

    if (this.props.content === 'login') {
      modalContent = (
        <form id={animations} className="login-form" onSubmit={this.login}>
          {checkInfo}
          <header id={hideMe} className="modal-header">
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
      if (this.state.form === 'signup3') {
        form = (<Signup3
              email={this.state.email}
              username={this.state.username}
              password={this.state.password}
              signup3={this.signup3}
              back={this.back}
              shakeModal={this.shakeModal} />);

      } else if (this.state.form === 'signup2') {
        form = (<Signup2
          animations={animations}
          dogName={this.state.dogName}
          dogAge={this.state.dogAge}
          dogBreed={this.state.dogBreed}
          back={this.back}
          signup2={this.signup2} />);

      } else if (this.state.form === 'signup1') {
        form = (<Signup1
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              age={this.state.age}
              hideModal={this.hideModal}
              signup1={this.signup1} />);
      }

      modalContent = (
        <section className="signup-form" id={animations}>
          {checkInfo}
          <header id={hideMe} className="modal-header signup-header">
            <input className="cancel-btn modal-btn" type="button" value="cancel" ref="cancel" role="button" tabIndex="0" onClick={this.hideModal}/>
            <h2>Hi. Let's sign up!</h2>
          </header>
           {form}
           {footer}
        </section>
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
