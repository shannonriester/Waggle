import React from 'react';
import { browserHistory } from 'react-router';

export default React.createClass({
  goToSettings: function() {
    browserHistory.push('/settings');
  },
  componentWillReceiveProps: function(newProps) {
    // console.log(newProps.matched);
    // console.log(newProps);
  },
  render: function() {
    let interactiveNav;
    let sentMatchBtn;
    let matchStatus;

    if (this.props.session.username === this.props.user.username) {
      interactiveNav = (
        <ul className="profile-sub-nav">
          <li>
            <button className="connect-btn edit-btn" onClick={this.props.editProfile}><i className="edit-icon fa fa-pencil" aria-hidden="true"></i></button>
            <label>edit</label>
          </li>
          <li>
            <button className="connect-btn settings-btn" onClick={this.goToSettings}><i className="fa fa-cog" aria-hidden="true"></i></button>
            <label>settings</label>
          </li>
          <li>
            <button className="connect-btn new-message-btn" onClick={this.props.message}><i className="message-icon sent-match fa fa-comments-o" aria-hidden="true"></i></button>
            <label>message</label>
          </li>
          <li>
          <button className="connect-btn new-message-btn"><i className="about-user-icon fa fa-paw" aria-hidden="true"></i></button>
            <label>{this.props.user.dog.dogName}, {this.props.user.dog.dogAge}, {this.props.user.dog.dogBreed}</label>
          </li>
          <li>
            <button className="connect-btn new-message-btn"><i className="about-user-icon fa fa-globe" aria-hidden="true"></i></button>
            <label>{this.props.user.city}, {this.props.user.regionName}</label>
          </li>
        </ul>
      );
    } else {

      if (this.props.findingMatchStatus) {
        sentMatchBtn = (<i className="heart-icon fa fa-spinner fa-pulse fa-fw"></i>);
        matchStatus = 'matching...'
      } else if (this.props.matched) {
        sentMatchBtn = (<i className="heart-icon matched fa fa-heart" aria-hidden="true"></i>)
        matchStatus = 'matched with!'
      } else if (this.props.sentMatch) {
        sentMatchBtn = (<i className="heart-icon sent-match fa fa-heart" aria-hidden="true"></i>);
        matchStatus = 'sent match...';
      } else {
         sentMatchBtn = (<i className="heart-icon fa fa-heart-o" aria-hidden="true"></i>);
          matchStatus = 'match with ';
      }

      interactiveNav = (
        <ul className="profile-sub-nav">
          <li>
            <button className="connect-btn new-message-btn" onClick={this.props.message}>
              <i className="message-icon fa fa-comments-o" aria-hidden="true"></i>
            </button>
            <label>message</label>
          </li>
          <li>
            <button className="connect-btn match-btn" onClick={this.props.toggleMatch}>
              {sentMatchBtn}
            </button>
            <label>{matchStatus}</label>
          </li>
          <li>
          <button className="connect-btn new-message-btn"><i className="about-user-icon fa fa-paw" aria-hidden="true"></i></button>
            <label>{this.props.user.dog.dogName}, {this.props.user.dog.dogAge}, {this.props.user.dog.dogBreed}</label>
          </li>
          <li>
            <button className="connect-btn new-message-btn"><i className="about-user-icon fa fa-globe" aria-hidden="true"></i></button>
            <label>{this.props.user.city}, {this.props.user.regionName}</label>
          </li>
        </ul>
      );
    }
    return (
      <div className="profile-interactive-component">
      {interactiveNav}
      </div>
    );
  }
});
