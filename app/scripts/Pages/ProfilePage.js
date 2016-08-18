import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Nav from '../Components/Nav';
import ProfileInfo from '../Components/ProfileInfo';
import UserRecentPlaces from '../Components/UserRecentPlaces';

export default React.createClass({
  getInitialState: function() {
      return {
        session: store.session.toJSON(),
        user: store.userCollection.toJSON(),
        chechinCollection: store.checkinCollection.toJSON(),
        state: "viewing",
        recentPlaces: [],
      }
  },
  editProfile: function() {
    store.session.set('isEditing', true);
  },
  goToSettings: function() {
    browserHistory.push('settings');
  },
  updateState: function() {
    // console.log('change detected');
    // console.log(store.userCollection.toJSON());
    this.setState({
      session: store.session.toJSON(),
      users: store.userCollection.toJSON(),
      checkinCollection: store.checkinCollection.toJSON(),
    });
    store.userCollection.fetch();
  },
  componentWillMount: function() {
    store.userCollection.fetch();
    store.checkinCollection.fetch();

    store.session.on('change', this.updateState);
    store.userCollection.once('change update', this.updateState);
    store.checkinCollection.once('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.userCollection.off('change update', this.updateState);
    store.checkinCollection.off('change update', this.updateState);
  },
  render: function() {
    let sessionNav;
    let userProfileInfo;
    let userRecentPlaces;
    if (this.state.session.username === this.props.params.userId) {
      sessionNav = (
        <ul className="nav-session">
          <li>
            <button className="edit-btn" onClick={this.editProfile}>edit <i className="fa fa-pencil" aria-hidden="true"></i></button>
          </li>
          <li>
            <button className="settings-btn" onClick={this.goToSettings}>settings <i className="fa fa-cog" aria-hidden="true"></i></button>
          </li>
        </ul>
      );
    }

    if (this.state.users) {
        userProfileInfo = this.state.users.map((user, i, arr) => {
          if (this.props.params.userId === user.username) {
              userProfileInfo = (<ProfileInfo key={i} user={user} updateSession={this.updateState} />);
              return (userProfileInfo);
          }
        });
      }

    if (this.state.checkinCollection) {
      userRecentPlaces = this.state.checkinCollection.map((place, i, arr) => {
        if (this.props.params.userId === place.userCheckedin) {
          let recentPlaces = (<UserRecentPlaces key={i} place={place} updateSession={this.updateState} />);
          // console.log(place);
          return recentPlaces;
        }
      });
    }

    return (
      <div className="profile-component">
        <Nav />
        <header className="profile-header">
          {sessionNav}
          {userProfileInfo}
          <button className="like-btn"><i className="icon-heart fa fa-heart-o" aria-hidden="true"></i></button>
        </header>

        <footer className="profile-footer">
          <ul className="ul-recent-places">
            {userRecentPlaces}
          </ul>
        </footer>
      </div>
    );
  }
});
