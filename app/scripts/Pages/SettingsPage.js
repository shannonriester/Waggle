import React from 'react';
import router from 'react-router';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
getInitialState: function() {
  return {
    editingDog: store.session.get('editingDog'),
    editingSelf: store.session.get('editingSelf'),
    range: store.session.get('range'),
    session: store.session.toJSON(),
  }
},
logout: function() {
    let prevQuery = store.session.get('query');
    let prevRange = this.state.range;
    store.session.logout(prevQuery, prevRange);
    if (!localStorage.authtoken) {
      browserHistory.push('/');
    }
},
showRagneSetting: function() {
  store.session.set('range', this.refs.range.value);
  this.updateState();
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
  this.setState({
    editingDog: store.session.get('editingDog'),
    editingSelf: store.session.get('editingSelf'),
    range: store.session.get('range'),
    session: store.session.toJSON(),
  });
},
componentDidMount: function() {
  store.session.on('change', this.updateState);
},
componentWillUnmount: function() {
  store.session.off('change', this.updateState);
},
render: function() {
  console.log(this.state.session);
  let dogInfo;
  let selfInfo;
  if (this.state.editingDog) {
    dogInfo = (
      <form onSubmit={this.saveDogInfo}>
        <ul className="edit-dog-info">
          <li><label>Name: </label><input type="text" defaultValue={this.state.session.dog.dogName} ref="dogName" /></li>
          <li><label>Breed: </label><input type="text" defaultValue={this.state.session.dog.dogBreed} ref="dogBreed" /></li>
          <li><label>Age: </label><input type="text" defaultValue={this.state.session.dog.dogAge} ref="dogAge" /></li>
          <li><button className="form-btn" onClick={this.saveDogInfo}>Done</button></li>
        </ul>
        <input className="submit-btn" type="submit" />
      </form>
    );
  } else {
    dogInfo = (
      <ul>
        <li><label>Name: </label>{this.state.session.dog.dogName}</li>
        <li><label>Breed: </label>{this.state.session.dog.dogBreed}</li>
        <li><label>Age: </label>{this.state.session.dog.dogAge}</li>
      </ul>
    );
  }
  if (this.state.editingSelf) {
    selfInfo = (
      <form onSubmit={this.saveUserInfo}>
        <ul className="edit-dog-info">
          <li><label>Email: </label><input type="text" defaultValue={this.state.session.email} ref="email" /></li>
          <li><label>First name: </label><input type="text" defaultValue={this.state.session.firstName} ref="firstName" /></li>
          <li><label>Last name: </label><input type="text" defaultValue={this.state.session.lastName} ref="lastName" /></li>
          <li><label>Age: </label><input type="text" defaultValue={this.state.session.age} ref="age" /></li>
          <li><button className="form-btn" onClick={this.saveUserInfo}>Done</button></li>
        </ul>
        <input className="submit-btn" type="submit" />
      </form>
    );
  } else {
    selfInfo = (
      <ul>
        <li><label>email: </label>{this.state.session.email}</li>
        <li><label>First name: </label>{this.state.session.firstName}</li>
        <li><label>Last name: </label>{this.state.session.lastName}</li>
        <li><label>Age: </label>{this.state.session.age}</li>
      </ul>
    );
  }


  return (
    <div className="settings-component">
      <Nav />
      <header className="user-settings">
        <div>
          <h3>About your pup</h3>
          <button className="edit-dog-btn" onClick={this.editDog}>Edit</button>
          {dogInfo}
          <h3>About you</h3>
          <button className="edit-user-info" onClick={this.editSelf}>Edit</button>
          {selfInfo}
        </div>
      </header>

      <main className="discovery-settings">
          <label>set the range for your searchs: </label>
          <input type="range" value={this.state.range} step="1" min="1" max="25" step="1" ref="range" onChange={this.showRagneSetting}/>
          <label>{this.state.range} miles</label>
      </main>

      <footer className="logout-delete-section">
        <button className="logout-btn" onClick={this.logout}>Logout</button>
        <section className="logo-version-section">Version 1.0.0</section>
        <button className="delete-account-btn">Delete Entire Chat Histoy</button>
        <button className="delete-account-btn">Delete Account</button>
      </footer>
    </div>
  );
}
});
