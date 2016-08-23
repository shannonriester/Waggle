import React from 'react';
import router from 'react-router';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
getInitialState: function() {
  return {
    range: store.session.get('range'),
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
  // console.log(this.refs.range.value);
  store.session.set('range', this.refs.range.value);
  this.updateState();
  store.session.updateUser();
},
updateState: function() {
  this.setState({range: store.session.get('range')});
},
componentDidMount: function() {
  // store.session.get('range');
  store.session.on('change', this.updateState);
},
componentWillUnmount: function() {
  store.session.off('change', this.updateState);
},
render: function() {
  return (
    <div className="settings-component">
      <Nav />
      <header className="user-settings">
        <form>
          <h3>About your pup</h3>
          <button className="edit-dog-info">Edit</button>
          <ul>
            <li><label>Breed: </label></li>
            <li><label>Gender: </label></li>
            <li><label>Birthday: </label></li>
          </ul>

          <h3>About you</h3>
          <button className="edit-user-info">Edit</button>
          <ul>
            <li><label>First name: </label></li>
            <li><label>Last name: </label></li>
            <li><label>Gender: </label></li>
            <li><label>Birthday: </label></li>
            <li><label>email: </label></li>
          </ul>

          <input className="submit-btn" type="submit"/>
        </form>
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
