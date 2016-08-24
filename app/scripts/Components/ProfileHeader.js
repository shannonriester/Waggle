import React from 'react';

import store from '../store';

export default React.createClass({
  render: function() {
    console.log(this.props);
    let sessionNavSection;
    let profilePicURL;
    let backgroundURLs;
    let heartIcon;
    let messageIcon;
    if (this.props.user[0]) {
      profilePicURL = this.props.user[0].profile.profilePic[0];
      // console.log(this.props.user[0]);
      backgroundURLs = this.props.user[0].bkgrndImgs[0];
    }
    let stylesProfilePic = {backgroundImage: 'url(' + profilePicURL + ')'};
    let stylesBkgrndImgs = {backgroundImage: 'url(' + backgroundURLs + ')'};

    if (this.props.session.username === this.props.route) {
      sessionNavSection = (
        <ul className="nav-session">
          <li>
            <button className="edit-btn" onClick={this.editProfile}>edit <i className="edit-icon fa fa-pencil" aria-hidden="true"></i></button>
          </li>
          <li>
            <button className="settings-btn" onClick={this.goToSettings}>settings <i className="fa fa-cog" aria-hidden="true"></i></button>
          </li>
        </ul>
      );
    } else if (this.props.sentMatch) {
      console.log(this.props.sentMatch);
        heartIcon = (<i className="icon-heart sent-match fa fa-heart" aria-hidden="true"></i>);
        messageIcon = (<i className="message-icon sent-match fa fa-comments-o" aria-hidden="true" onClick={this.messageUser}></i>);
    } else {
        heartIcon = (<i className="icon-heart fa fa-heart-o" aria-hidden="true" onClick={this.toggleMatch}></i>);
        messageIcon = (<i className="message-icon fa fa-comments-o" aria-hidden="true" onClick={this.messageUser}></i>);
    }



    return (
      <div className="profile-header-container">
        <div className="background-profile-images">
          <section className="edit-settings">
            {sessionNavSection}
          </section>
        </div>
        <h2 className="profile-heading-username">{this.props.session.username}</h2>
        <figure className="profile-pic" style={stylesProfilePic}></figure>

        <nav className="profile-nav-connect">
          <ul className="ul-connect-section">
            <li>{heartIcon}</li>
          </ul>
        </nav>

      </div>
    );
  }
});
