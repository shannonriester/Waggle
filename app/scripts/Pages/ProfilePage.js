import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Nav from '../Components/Nav';
import ProfileInfo from '../Components/ProfileInfo';

export default React.createClass({
  getInitialState: function() {
      return {
        session: store.session.toJSON(),
        user: store.userCollection.findUser(this.props.params.userId),
        editProfile: false,
      }
  },
  editProfile: function() {
    store.session.set('isEditing', true);
  },
  goToSettings: function() {
    browserHistory.push('settings');
  },
  updateState: function() {
    this.setState({
      session: store.session.toJSON(),
      users: store.userCollection.toJSON(),
    });
  },
  componentWillMount: function() {
    store.userCollection.fetch();

    store.userCollection.on('change update', this.updateState);
    store.session.on('change', this.updateState);
    // console.log(store.session.apiGeoLocation());
  },
  componentDidMount: function() {
    let user = store.userCollection.findUser(this.props.params.userId);
    // this.setState({user:user});
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.userCollection.off('change update', this.updateState);
  },
  render: function() {
    let sessionNav;
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

    let userProfileInfo;
    if (this.state.users) {
        let uiState;
        if (this.state.editProfile) {
          uiState="editing";
        } else {
          uiState="viewing";
        }
        userProfileInfo = this.state.users.map((user, i, arr) => {
          if (this.props.params.userId === user.username) {
            return (<ProfileInfo key={i} user={user} uiState={uiState}/>);
          }
        });
      }

    return (
      <div className="profile-component">
        <Nav />
        <header className="profile-header">
          {sessionNav}
          {userProfileInfo}

          <div className="like-user">
            <button className="like-btn"><i className="icon-heart fa fa-heart-o" aria-hidden="true"></i></button>
          </div>
        </header>

        <form className="profile-footer">
          <ul className="ul-recent-places">
            <li>Barton Springs, 2 hours ago</li>
            <li>Town Lake, 5 days ago</li>
            <li>Random park, random time ago</li>
          </ul>
        </form>
      </div>
    );
  }
});
