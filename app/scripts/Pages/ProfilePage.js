import React from 'react';
import { browserHistory } from 'react-router';
import _ from 'underscore';
import moment from 'moment';

import store from '../store';
import Nav from '../Components/Nav';
import ProfileHeader from '../Components/ProfileHeader';
import ProfileInfo from '../Components/ProfileInfo';
import UserRecentPlaces from '../Components/UserRecentPlaces';
import NewMessage from '../Components/NewMessage';

export default React.createClass({
  getInitialState: function() {
      return {
        session: store.session.toJSON(),
        userCollcetion: store.userCollection.toJSON(),
        matchCollection: [],
        checkinCollection: [],
        placesCollection: [],
        recentPlaces: [],
        newMessage: false,
        fetch: true,
        sentMatch: false,
        receivedMatch: false,
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
  editProfile: function() {
    store.session.set('editProfile', true);
  },
  toggleMatch: function() {
    store.matchCollection.toggleMatch(this.state.session.username, this.props.params.userId);
    this.setState({
      matchBtn: !this.state.matchBtn,
      sentMatch: !this.state.sentMatch,
    });
  },
  messageUser: function() {
    this.setState({newMessage:true});
    // browserHistory.push(`/messages/newMessage`)
  },
  hideMessageModal: function() {
    this.setState({newMessage:false});
  },
  goToSettings: function() {
    browserHistory.push('/settings');
  },
  updateState: function() {
    this.setState({
      session: store.session.toJSON(),
      userCollcetion: store.userCollection.toJSON(),
      checkinCollection: store.checkinCollection.toJSON(),
      placesCollection: store.placesCollection.toJSON(),
    });
  },
  updateSession: function() {
    store.userCollection.fetch();
    this.setState({
      session: store.session.toJSON(),
      userCollcetion: store.userCollection.toJSON(),
    });
  },
  componentWillMount: function() {
    this.fetchPlaces();
    store.userCollection.fetch();
    store.checkinCollection.fetch();

    //be careful here! notice that the parameters are SWITCHED to see who sent the match and who received the match
    store.matchCollection.findMatch(this.state.session.username, this.props.params.userId).then((response) => {
      this.setState({sentMatch: response.toJSON()[0]});
    });

    store.matchCollection.findMatch(this.props.params.userId, this.state.session.username).then((response) => {
      this.setState({receivedMatch: response.toJSON()[0]});
    });
  },
  componentDidMount: function() {
    store.session.on('change', this.updateState);
    store.userCollection.once('change update', this.updateSession);
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
    let userProfileInfo;
    let newMessageModal;
    let heartIcon;
    let messageBtn;
    let testyCake;

    //talk about refactoring this in the readme
    // if (this.state.session.username === this.props.params.userId) {
    //   sessionNav = (
    //     <ul className="nav-session">
    //       <li>
    //         <button className="edit-btn" onClick={this.editProfile}>edit <i className="edit-icon fa fa-pencil" aria-hidden="true"></i></button>
    //       </li>
    //       <li>
    //         <button className="settings-btn" onClick={this.goToSettings}>settings <i className="fa fa-cog" aria-hidden="true"></i></button>
    //       </li>
    //     </ul>
    //   );
    // } else if (this.state.sentMatch) {
    //     heartIcon = (<i className="icon-heart sent-match fa fa-heart" aria-hidden="true"></i>);
    //     messageBtn = (<i className="message-icon sent-match fa fa-comments-o" aria-hidden="true" onClick={this.messageUser}></i>);
    // } else {
    //     heartIcon = (<i className="icon-heart fa fa-heart-o" aria-hidden="true" onClick={this.toggleMatch}></i>);
    //     messageBtn = (<i className="message-icon fa fa-comments-o" aria-hidden="true" onClick={this.messageUser}></i>);
    // }

    // if (this.state.users)
    // testyCake = this.state.user.map((user, i, arr) => {
    //   // console.log(testycake);
    //   if (this.props.params.userId === user.username) {
    //       return user;
    //       // return (<ProfileInfo key={i} user={user} updateState={this.updateState} />);
    //   }
    // });

    let sessionProps;
    if (this.state.session) {
      sessionProps = this.state.session;
    }

    let currUser;
    currUser = this.state.userCollcetion.filter((user,i) => {
      if (this.props.params.userId === user.username) {
          return user;
      }
    });

    let sentMatch;
    if (this.state.sentMatch) {
      sentMatch = this.state.sentMatch;
    }

    // if (this.state.newMessage) {
    //   newMessageModal = (<NewMessage recipient={this.props.params.userId} hideMessageModal={this.hideMessageModal}/>);
    // }

    // let userRecentPlaces;

    // let myMatches = [];
    // if (this.state.sentMatch && this.state.receivedMatch) {
    //     let placeIDArr = this.state.recentPlaces.map((place, i, arr) => {
    //       return place.place;
    //     });
    //     placeIDArr = _.sortBy(placeIDArr, (place) => {
    //       return moment(place.time).unix();
    //     }).reverse();
    //
    //     let fixedPlaces = this.state.placesCollection.filter((place) => {
    //       if (placeIDArr.indexOf(place.yelpID) > -1) {
    //         return true;
    //       }
    //     });
    //     if (fixedPlaces.length > 4) {
    //       fixedPlaces = fixedPlaces.slice(0,4);
    //     }
    //     userRecentPlaces = fixedPlaces.map((place, i, arr) => {
    //         return (<UserRecentPlaces key={i} place={place} updateState={this.updateSession} />);
    //     });
    //     myMatches = myMatches.concat(this.state.receivedMatch.likee);
    // }


    // <header className="profile-header">
    //   {userProfileInfo}
    //   {sessionNav}
    //   <ul className="ul-match-section">
    //     <li>{heartIcon}</li>
    //     <li>{messageBtn}</li>
    //   </ul>
    // </header>

    // <footer className="profile-footer">
    //   <ul className="ul-recent-places">
    //     {userRecentPlaces}
    //   </ul>
    //   <ul className="matched-wagglrs">
    //     {myMatches}
    //   </ul>
    // </footer>

    return (
      <div className="profile-container-component">
        <Nav />
          {newMessageModal}
          <ProfileHeader
            route={this.props.params.userId}
            session={sessionProps}
            user={currUser}
            sentMatch={sentMatch}/>
      </div>
    );
  }
});
