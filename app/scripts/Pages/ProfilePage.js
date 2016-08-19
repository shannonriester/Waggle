import React from 'react';
import { browserHistory } from 'react-router';
import _ from 'underscore';

import store from '../store';
import Nav from '../Components/Nav';
import ProfileInfo from '../Components/ProfileInfo';
import UserRecentPlaces from '../Components/UserRecentPlaces';

export default React.createClass({
  getInitialState: function() {
      return {
        session: store.session.toJSON(),
        user: store.userCollection.toJSON(),
        checkinCollection: [],
        placesCollection: [],
        state: "viewing",
        // checkedinPlaces: [],
        recentPlaces: [],
      }
  },
  fetchPlaces: function() {
    console.log('fetching places');

    if (this.state.checkinCollection) {
      let recentPlaces = this.state.checkinCollection.filter((curr,i,arr) => {
        if (this.props.params.userId === curr.userCheckedin) {
          // console.log(curr.place);
          // console.log(store.placesCollection.where(curr.place));
            store.placesCollection.getYelpResult(curr.place, store.session.get('city'));
          return true;

        }
      });
      // console.log(recentPlaces);
      this.setState({'recentPlaces': recentPlaces});
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
      user: store.userCollection.toJSON(),
      checkinCollection: store.checkinCollection.toJSON(),
      placesCollection: store.placesCollection.toJSON(),
    });
  },
  componentDidMount: function() {
    // store.placesCollection.reset();
    // store.checkinCollection.reset();
    this.fetchPlaces();
    store.userCollection.fetch();
    // store.userCollection.fetch();
    store.checkinCollection.fetch();
  },
  componentWillMount: function() {
    // store.placesCollection.getResults(,store.session.get('city'));
    // store.placesCollection.reset();
    // store.checkinCollection.reset();

    store.session.on('change', this.updateState);
    store.userCollection.once('change update', this.updateState);
    store.checkinCollection.on('change update', this.updateState);
    store.checkinCollection.on('change update', this.fetchPlaces);
    store.placesCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.userCollection.off('change update', this.updateState);
    store.checkinCollection.off('change update', this.updateState);
    store.checkinCollection.off('change update', this.fetchPlaces);
    store.placesCollection.off('change update', this.updateState);
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
        userProfileInfo = this.state.user.map((user, i, arr) => {
          if (this.props.params.userId === user.username) {
              userProfileInfo = (<ProfileInfo key={i} user={user} updateSession={this.updateState} />);
              return (userProfileInfo);
          }
        });

      console.log('placesCollection', this.state.placesCollection);
      // let fixedPlacesCollection = _.uniq(this.state.placesCollection)
      let placeIDArr = this.state.recentPlaces.map((place, i, arr) => {
        console.log(place);
        return place.place
      })
      // console.log(placeIDArr);

      let fixedPlaces = this.state.placesCollection.filter((place) => {
        // console.log(place.yelpID);
        if (placeIDArr.indexOf(place.yelpID) > -1) {
          return true
        }
      })

      userRecentPlaces = fixedPlaces.map((place, i, arr) => {
          return (<UserRecentPlaces key={i} place={place} updateSession={this.updateState} />);
      });

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
