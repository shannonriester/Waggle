import React from 'react';
import { browserHistory } from 'react-router';
import router from 'react-router';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
getInitialState: function() {
  return {
    editingDog: store.session.get('editingDog'),
    editingSelf: store.session.get('editingSelf'),
    range: store.session.get('range'),
    gotUser: false,
    session: store.session.toJSON(),
    authtoken: localStorage.authtoken,
  }
},
logout: function() {
    this.setState({authtoken:null});
    this.updateState();
    let prevQuery = store.session.get('query');

    let prevRange = this.state.range;
    store.session.logout(prevQuery, prevRange);

    if (!this.state.authtoken) {
      browserHistory.push('/');
    }
},
updateSlider: function() {
  store.session.set('range', this.refs.range.value);
  this.setState({range: this.refs.range.value});
  store.session.updateUser();
},
editDog: function(e) {
  e.preventDefault();
  store.session.set('editingDog', true);
  this.updateState();
},
editSelf: function(e) {
  e.preventDefault();
  store.session.set('editingSelf', true);
  this.updateState();
},
saveDogInfo: function(e) {
  e.preventDefault();
  let newDogName = this.refs.dogName.value;
  let newDogBreed = this.refs.dogBreed.value;
  let newDogAge = this.refs.dogAge.value;

  store.session.updateDogInfo(newDogName, newDogBreed, newDogAge);
},
saveUserInfo: function(e) {
  e.preventDefault();
  let newEmail = this.refs.email.value;
  let newFirstName = this.refs.firstName.value;
  let newLastName = this.refs.lastName.value;
  let newAge = Number(this.refs.age.value);

  store.session.updateUserInfo(newEmail, newFirstName, newLastName, newAge);
},
updateState: function() {
  if (!this.state.authtoken) {
    browserHistory.push('/');
  }
  console.log(store.session.get('range'));

  if (store.session.get('range') !== '8' && !this.state.gotUser) {
    console.log('got user: ', store.session.get('range'));
    this.setState({range: store.session.get('range'), gotUser: true});
  }

  this.setState({
    editingDog: store.session.get('editingDog'),
    editingSelf: store.session.get('editingSelf'),
    session: store.session.toJSON(),
  });

},
componentWillMount: function() {
  if (!this.state.authtoken) {
    browserHistory.push('/');
  }
},
componentDidMount: function() {
  if (!this.state.authtoken) {
    browserHistory.push('/');
  }
  store.session.on('change', this.updateState);
},
componentWillUnmount: function() {
  store.session.off('change', this.updateState);
},
render: function() {
  let dogInfo;
  let selfInfo;
  if (this.state.editingDog) {
    dogInfo = (
      <form onSubmit={this.saveDogInfo}>
        <ul className="edit-dog-info">
          <li><label className="settings-label">Name: </label><input type="text" defaultValue={this.state.session.dog.dogName} ref="dogName" /></li>
          <li><label className="settings-label">Breed: </label><input type="text" defaultValue={this.state.session.dog.dogBreed} ref="dogBreed" /></li>
          <li><label className="settings-label">Age: </label><input type="text" defaultValue={this.state.session.dog.dogAge} ref="dogAge" /></li>
          <li><button className="form-btn" onClick={this.saveDogInfo}>Done</button></li>
        </ul>
        <input className="submit-btn" type="submit" />
      </form>
    );
  } else {
    dogInfo = (
      <ul>
        <li><label className="settings-label">Name: </label><p>{this.state.session.dog.dogName}</p></li>
        <li><label className="settings-label">Breed: </label><p>{this.state.session.dog.dogBreed}</p></li>
        <li><label className="settings-label">Age: </label><p>{this.state.session.dog.dogAge}</p></li>
      </ul>
    );
  }
  if (this.state.editingSelf) {
    selfInfo = (
      <form onSubmit={this.saveUserInfo}>
        <ul className="edit-self-info">
          <li><label className="settings-label">Email: </label><input type="text" defaultValue={this.state.session.email} ref="email" /></li>
          <li><label className="settings-label">First name: </label><input type="text" defaultValue={this.state.session.firstName} ref="firstName" /></li>
          <li><label className="settings-label">Last name: </label><input type="text" defaultValue={this.state.session.lastName} ref="lastName" /></li>
          <li><label className="settings-label">Age: </label><input type="text" defaultValue={this.state.session.age} ref="age" /></li>
          <li><button className="form-btn" onClick={this.saveUserInfo}>Done</button></li>
        </ul>
        <input className="submit-btn" type="submit" />
      </form>
    );
  } else {
    selfInfo = (
      <ul>
        <li><label className="settings-label">email: </label><p>{this.state.session.email}</p></li>
        <li><label className="settings-label">First name: </label><p>{this.state.session.firstName}</p></li>
        <li><label className="settings-label">Last name: </label><p>{this.state.session.lastName}</p></li>
        <li><label className="settings-label">Age: </label><p>{this.state.session.age}</p></li>
      </ul>
    );
  }


  return (
    <div className="settings-component">
      <Nav />
      <div className="settings-content-container">
        <header className="header-settings">
          <div className="about-dog-settings">
            <h3 className="settings-headings">About your pup</h3>
            <button className="edit-settings-btn" onClick={this.editDog}>Edit</button>
            {dogInfo}
          </div>
          <div className="about-session-settings">
            <h3 className="settings-headings">About you</h3>
            <button className="edit-settings-btn" onClick={this.editSelf}>Edit</button>
            {selfInfo}
          </div>
        </header>

        <main className="discovery-settings">
            <label className="settings-label">Discovery </label>
            <input className="input-range" type="range" value={this.state.range} step="1" min="1" max="25" step="1" ref="range" onChange={this.updateSlider}/>
            <label>{this.state.range} miles</label>
        </main>

        <footer className="footer-settings">
          <h2 className="version-heading">Version 1.0.0</h2>
          <button className="logout-btn" onClick={this.logout}>Logout</button>
          <button className="delete-account-btn hide-me">Delete Entire Chat Histoy</button>
          <button className="delete-account-btn hide-me">Delete Account</button>
        </footer>
      </div>
    </div>
  );
}
});
