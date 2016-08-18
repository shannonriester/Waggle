import React from 'react';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
logout: function() {
    let prevQuery = store.session.get('query');
    store.session.logout(prevQuery);
  },
render: function() {

  return (
    <div className="settings-component">
      <Nav />
      <header className="user-settings">
        <form>
          <h3>About your pup</h3>
          <button className="edit">Edit</button>
          <ul>
            <li><label>Breed: </label></li>
            <li><label>Gender: </label></li>
            <li><label>Birthday: </label></li>
          </ul>

          <h3>About you</h3>
          <button className="edit">Edit</button>
          <ul>
            <li><label>First name: </label></li>
            <li><label>Last name: </label></li>
            <li><label>Gender: </label></li>
            <li><label>Birthday: </label></li>
            <li><label>email: </label></li>
          </ul>

          <input className="hide-submit" type="submit"/>
        </form>
      </header>

      <main className="discovery-settings">
        <form>
          location: my current location
          max-distance
          <input type="range" min="1" max="25" step="1" />
        </form>
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
