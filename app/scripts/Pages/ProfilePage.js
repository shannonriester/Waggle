import React from 'react';
import { browserHistory } from 'react-router';
import _ from 'underscore';
import moment from 'moment';

import store from '../store';
import Nav from '../Components/Nav';
import MyMatches from '../Components/MyMatches';
import ProfileInfo from '../Components/ProfileInfo';
import UserRecentPlaces from '../Components/UserRecentPlaces';
import NewMessage from '../Components/NewMessage';

export default React.createClass({
  getInitialState: function() {
      return {
        session: store.session.toJSON(),
        currentUser: {},
        checkinCollection: store.checkinCollection.toJSON(),
        placesCollection: store.placesCollection.toJSON(),
        recentPlaces: [],
        newMessage: false,
        fetch: false,
        sentMatch: false,
        receivedMatch: false,
        allMyMatches: []
      }
  },
  fetchPlaces: function() {
    if (this.state.checkinCollection) {
      let recentPlaces = this.state.checkinCollection.filter((curr,i,arr) => {
        if (this.props.params.userId === curr.userCheckedin) {
            store.placesCollection.getYelpResult(curr.place, store.session.get('city'));
          return true;
        }
      });
      this.setState({'recentPlaces': recentPlaces});
    }
  },
  toggleMatch: function() {
    store.matchCollection.toggleMatch(this.state.session.username, this.props.params.userId);
    this.setState({
      sentMatch: !this.state.sentMatch,
    });
  },
  messageUser: function() {
    this.setState({newMessage: true});
    // browserHistory.push(`/messages/newMessage`)
  },
  hideMessageModal: function() {
    this.setState({newMessage: false});
  },
  goToSettings: function() {
    browserHistory.push('/settings');
  },
  updateState: function() {
    this.setState({
      session: store.session.toJSON(),
      users: store.userCollection.toJSON(),
      checkinCollection: store.checkinCollection.toJSON(),
      placesCollection: store.placesCollection.toJSON(),
    });
    if (!this.state.fetch && this.state.session.username) {
      store.matchCollection.findMatch(this.state.session.username, this.props.params.userId).then((response)=> {
        if (response.models.length >= 2) {
          this.setState({matched: true});
        }
      });

      store.matchCollection.allMyMatches(this.state.session.username).then((response) => {
        let matchedArr = [];
        matchedArr.push(response);
        matchedArr = _.flatten(matchedArr)
        this.setState({
          allMyMatches: matchedArr,
          fetch: true,
        });
      });
      this.setState({fetch: true});
    }
  },
  componentWillReceiveProps: function(newProps) {
    store.userCollection.findUser(newProps.params.userId).then((response) => {
      this.setState({currentUser: response.toJSON()[0]});
    });
  },
  componentDidMount: function() {
    store.userCollection.findUser(this.props.params.userId).then((response) => {
      this.setState({currentUser: response.toJSON()[0]});
    })

    store.session.on('change', this.updateState);
    store.userCollection.on('change update', this.updateState);
    store.checkinCollection.on('change update', this.updateState);
    store.checkinCollection.on('change update', this.fetchPlaces);
    store.placesCollection.on('change update', this.updateState);
    store.matchCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.userCollection.off('change update', this.updateState);
    store.checkinCollection.off('change update', this.updateState);
    store.checkinCollection.off('change update', this.fetchPlaces);
    store.placesCollection.off('change update', this.updateState);
    store.matchCollection.off('change update', this.updateState);
  },
  render: function() {
    let sessionNav;
    let profileInfo;
    let newMessageModal;
    let myMatchesComponent;
    if (this.state.currentUser.username) {
        profileInfo = (<ProfileInfo
          user={this.state.currentUser}
          messageUser={this.messageUser}
          toggleMatch={this.toggleMatch}
          matched={this.state.matched}
          />);
    }

    if (this.state.newMessage) {
      newMessageModal = (<NewMessage
        recipient={this.props.params.userId}
        hideMessageModal={this.hideMessageModal}/>);
    }

    let userRecentPlaces;
    let myMatches = [];
    if (this.state.matched || this.props.params.userId === this.state.currentUser.username) {
        let placeIDArr = this.state.recentPlaces.map((place, i, arr) => {
          return place.place;
        });
        placeIDArr = _.sortBy(placeIDArr, (place) => {
          return moment(place.time).unix();
        }).reverse();

        let fixedPlaces = this.state.placesCollection.filter((place) => {
          if (placeIDArr.indexOf(place.yelpID) > -1) {
            return true;
          }
        });
        if (fixedPlaces.length > 4) {
          fixedPlaces = fixedPlaces.slice(0,4);
        }
        userRecentPlaces = fixedPlaces.map((place, i, arr) => {
            return (<UserRecentPlaces
                      key={i}
                      place={place}
                      updateState={this.updateSession} />);
        });
    }

    if (this.state.session.username === this.props.params.userId) {
      myMatches = (<MyMatches myMatches={this.state.allMyMatches}/>);
    }
    return (
      <div className="profile-component">
        <Nav />
          {newMessageModal}
          {profileInfo}

        <footer className="profile-footer">
          <div className="matched-wagglrs">
            {myMatches}
          </div>
          <ul className="ul-recent-places">
            {userRecentPlaces}
          </ul>
        </footer>
      </div>
    );
  }
});
