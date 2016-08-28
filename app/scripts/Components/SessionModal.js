import React from 'react';
import { browserHistory } from 'react-router';
import { DateField, Calendar, DecadeView } from 'react-date-picker';
import moment from 'moment';

import ReactWidgets from 'react-widgets';
import _ from 'underscore';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      shakeModal: false,
      value0 : new Date(),
      form: 'signup1',
      username: '',
      email: '',
      password: '',
      dogName: '',
      dogAge: '',
      dogBreed: '',
      firstName: '',
      lastName: '',
      age: '',

    }
  },
  login: function(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    username.toLowerCase();

    store.session.login(username, password);
    this.props.hideModal();
  },
  signup3: function(e) {
    e.preventDefault();
    // let email =this.refs.email.value;
    // let firstName = this.refs.firstName.value;
    // let lastName = this.refs.lastName.value;
    // let age = this.refs.age.value;

    // let password = this.refs.password.value;
    // let password2 = this.refs.password2.value;

    // if (password !== password2 || username === '' || username === ' ' || password === '' || password === ' ') {
    //   console.log('passwords don\'t match or you didn\'t enter a username!');
    // } else {
      store.session.signup(
        this.state.username,
        this.state.password,
        this.state.email,
        this.state.firstName,
        this.state.lastName,
        this.state.age,
        this.state.dogName,
        this.state.dogAge,
        this.state.dogBreed
      );
    // }
  },
  handleChange: function(e) {
    this.setState({value: e.target.value});
  },
  back: function() {
    if (this.state.form === 'signup3') {
      this.setState({form: 'signup2'});
    } else {
      this.setState({form: 'signup1'});
    }
  },
  signup3: function() {
    let username = this.refs.username.value;
    username = username.toLowerCase();

    let password = this.refs.password.value;
    let password2 = this.refs.password2.value;

    if (password !== password2 || username === '' || username === ' ' || password === '' || password === ' ') {
      console.log('passwords don\'t match or you didn\'t enter a username!');
      this.setState({shakeModal: true});
    } else {
      this.setState({
        form: 'signup2',
        username: username,
        email: this.refs.email.value,
        password: password,
      });
    }
  },
  signup1: function() {
    this.setState({
      form: 'signup2',
      dogName: this.refs.dogName.value,
      dogAge: this.refs.dogAge.value,
      dogBreed: this.refs.dogBreed.value,
    });
  },
  signup2: function() {
    this.setState({
      form: 'signup3',
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      age: this.refs.age.value,
    });
  },
  shakeModal: function() {
    console.log('try to shake modal!');
  },
  hideModal: function(e) {
    if (_.toArray(e.target.classList).indexOf('modal-component') !== -1 || _.toArray(e.target.classList).indexOf('cancel-btn') !== -1 ) {
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
    let animations = '';
    if (this.state.shakeModal) {
      animations = 'shake';
    }
    let form;
    let footer;

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
      if (this.state.form === 'signup3') {
        form = (
          <form className="modal-body signup3" onSubmit={this.signup3}>
            <label htmlFor="input-username">Email</label>
            <input className="user-info-input" type="text" value={this.state.email} placeholder="email" ref="email" role="textbox" tabIndex="1" onChange={this.handleChange}/>

            <label htmlFor="input-username">Username</label>
            <input className="user-info-input" type="text" value={this.state.username} placeholder="username" ref="username" role="textbox" tabIndex="2" onChange={this.handleChange}/>

            <label htmlFor="input-password">Password</label>
            <input className="user-info-input" type="password" placeholder="password" ref="password" role="textbox" tabIndex="3" onChange={this.handleChange}/>

            <label htmlFor="input-confirm-password">Confirm password</label>
            <input className="user-info-input" type="password" placeholder="password" ref="password2" role="textbox" tabIndex="4" onChange={this.handleChange}/>

            <input className="submit-btn" type="submit" value="submit" role="button" onSubmit={this.signup3} />
          </form>
        );
        footer = (
          <footer className="modal-footer">
            <button className="modal-btn back-btn" role="button" tabIndex="5" onClick={this.back}>Back</button>
            <button className="modal-btn" role="button" tabIndex="6" onClick={this.signup3}>Back</button>
          </footer>
        );
      } else if (this.state.form === 'signup1') {
        form = (
          <form className="modal-body signup1">
            <h3>Tell us about your dog</h3>
            <label htmlFor="input-dogName">Name</label>
            <input className="dog-info-input" type="text" value={this.state.dogName} placeholder="your dog's name" ref="dogName" role="textbox" tabIndex="1" onChange={this.handleChange}/>

            <label htmlFor="input-dogAge">Age</label>
            <input className="dog-info-input" type="text" value={this.state.dogAge} placeholder="your dog's age" ref="dogAge" role="textbox" tabIndex="2" onChange={this.handleChange}/>

            <label htmlFor="input-dogBreed">Breed</label>
            <input className="dog-info-input" type="text" value={this.state.dogBreed} placeholder="what breed is your dog?" ref="dogBreed" role="textbox" tabIndex="3" onChange={this.handleChange}/>

            <input className="submit-btn" type="submit" value="submit" role="button" onSubmit={this.signup1} />
          </form>
        );

        footer = (
          <footer className="modal-footer">
            <button className="modal-btn" role="button" tabIndex="4" onClick={this.signup1}>Next</button>
          </footer>
        );
      } else if (this.state.form === 'signup2') {
        form = (
          <form className="modal-body signup2">
            <h3>Tell us a little about you</h3>

            <label htmlFor="input-username">First name</label>
            <input className="user-info-input" type="text" value={this.state.firstName} placeholder="First name" ref="firstName" role="textbox" tabIndex="1" onChange={this.handleChange}/>

            <label htmlFor="input-username">Last name</label>
            <input className="user-info-input" type="text" value={this.state.lastName} placeholder="Last name" ref="lastName" role="textbox" tabIndex="2" onChange={this.handleChange}/>

            <label htmlFor="input-username">Age</label>
            <input className="user-info-input" type="text" value={this.state.age} placeholder="Age" ref="age" role="textbox" tabIndex="3" onChange={this.handleChange}/>

            <input className="submit-btn" type="submit" value="submit" role="button" onSubmit={this.signup2} />
          </form>
        );
        footer = (
          <footer className="modal-footer">
            <button className="modal-btn back-btn" role="button" tabIndex="4" onClick={this.back}>Back</button>
            <button className="modal-btn" role="button" tabIndex="5" onClick={this.signup2}>Next</button>
          </footer>
        );
      }

      modalContent = (
        <section className="signup-form">
          <header className="modal-header">
            <h2>Hi. Let's sign up!</h2>
            <input className="cancel-btn modal-btn" type="button" value="cancel" ref="cancel" role="button" tabIndex="0" onClick={this.hideModal}/>
          </header>
           {form}
           {footer}
        </section>
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
