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
        // receivedMatch: false,
        allMyMatches: [],
        matched: false,
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
    this.setState({findingMatchStatus: true});
    store.matchCollection.toggleMatch(this.state.session.username, this.props.params.userId)
      .then((toggleResponse) => {
        store.matchCollection.findMatch(this.state.session.username, this.props.params.userId).then((response)=> {
          if (response.length > 1) {
            this.setState({
              matched: true,
              sentMatch: true,
              findingMatchStatus: false,
            });
          } else {
            this.setState({
              matched: false,
              findingMatchStatus: false,
            });
            if (this.state.sentMatch || response[0].get('sender') === this.state.session.username) {
              this.setState({
                sentMatch: !this.state.sentMatch,
                findingMatchStatus: false,
              });
            }
          }
        });
      })
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
      store.matchCollection.allMyMatches(this.state.session.username).then((response) => {
        let matchedArr = [];
        matchedArr.push(response);
        matchedArr = _.flatten(matchedArr)
        this.setState({
          allMyMatches: matchedArr,
          fetch: true
        });
        store.matchCollection.findMatch(this.state.session.username, this.props.params.userId).then((response)=> {
          if (response.length > 1) {
            this.setState({matched: true});
          }
          let sentReq = store.matchCollection.where({sender: this.state.session.username, likee: this.props.params.userId})
          if (sentReq.length) {
            this.setState({sentMatch: true});
          }
        });
      })
      .catch((e) => {
        console.error(e);
        this.setState({fetch: true});
      }) ;
    }
  },
  componentWillReceiveProps: function(newProps) {
    store.userCollection.findMe(newProps.params.userId).then((response) => {
      this.setState({currentUser: response[0], fetch: false});
      this.updateState();
    });
  },
  componentDidMount: function() {
    store.userCollection.findMe(this.props.params.userId).then((response) => {
      console.log(response);
      this.setState({currentUser: response[0]});
    });

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
        // console.log(this.state.currentUser);
        profileInfo = (<ProfileInfo
          user={this.state.currentUser}
          messageUser={this.messageUser}
          toggleMatch={this.toggleMatch}
          findingMatchStatus={this.state.findingMatchStatus}
          sentMatch={this.state.sentMatch}
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
    if (this.state.matched || this.props.params.userId === this.state.session.username) {
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
