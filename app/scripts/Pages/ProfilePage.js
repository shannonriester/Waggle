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
    // browserHistory.push(`newMessage`)
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
      checkinCollection: store.checkinCollection.toJSON(),
      placesCollection: store.placesCollection.toJSON(),
    });

    if (!this.state.fetch && this.state.session.username) {
      store.matchCollection.allMyMatches(this.state.session.username).then((response) => {
        let matchedArr = [];
        matchedArr.push(response);
        matchedArr = _.flatten(matchedArr);
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
      });
    }
  },
  componentWillReceiveProps: function(newProps) {
    store.userCollection.findMe(newProps.params.userId).then((response) => {
      this.fetchPlaces();
      this.setState({currentUser: response.toJSON(), fetch: false});
      this.updateState();
    });
  },
  componentDidMount: function() {
      store.userCollection.findMe(this.props.params.userId).then((response) => {
        this.setState({currentUser: response.toJSON()});
      });

    store.session.on('change', this.updateState);
    store.userCollection.on('change update', this.updateState);
    store.checkinCollection.on('update', this.updateState);
    store.checkinCollection.on('update', this.fetchPlaces);
    store.placesCollection.on('update', this.updateState);
    store.matchCollection.on('update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.userCollection.off('change update', this.updateState);
    store.checkinCollection.off('update', this.updateState);
    store.checkinCollection.off('update', this.fetchPlaces);
    store.placesCollection.off('update', this.updateState);
    store.matchCollection.off('update', this.updateState);
  },
  render: function() {
    let sessionNav;
    let profileInfo;
    let newMessageModal;
    let myMatches;

    if (this.state.currentUser.username) {
      let allMyMatches;
      let recentPlaces = [];

      if (this.state.session.username === this.props.params.userId) {
        allMyMatches = this.state.allMyMatches;
      }
      if (this.state.matched || (this.props.params.userId === this.state.session.username)) {
          this.state.placesCollection.forEach((place, i, arr) => {
            recentPlaces = this.state.placesCollection;
            // userRecentPlaces = (<UserRecentPlaces key={i} recentPlaces={this.state.placesCollection} />);
          });
      }
        profileInfo = (<ProfileInfo
          user={this.state.currentUser}
          messageUser={this.messageUser}
          toggleMatch={this.toggleMatch}
          findingMatchStatus={this.state.findingMatchStatus}
          sentMatch={this.state.sentMatch}
          matched={this.state.matched}
          allMyMatches={allMyMatches}
          recentPlaces = {recentPlaces}
          />);
    }

    if (this.state.newMessage) {
      newMessageModal = (<NewMessage
        recipient={this.props.params.userId}
        hideMessageModal={this.hideMessageModal}/>);
    }

    return (
      <div className="profile-component">
        <Nav />
          {newMessageModal}
          {profileInfo}
        {
        //   <footer className="profile-footer">
        //   <div className="matched-wagglrs">
        //     {myMatches}
        //   </div>
        //   <h2 className="h2-recent-places">Recent Places</h2>
        //   <div className="ul-recent-places">
        //     {userRecentPlaces}
        //   </div>
        // </footer>
        }
      </div>
    );
  }
});
