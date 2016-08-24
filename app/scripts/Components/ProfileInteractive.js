import React from 'react';

export default React.createClass({
  render: function() {
    // console.log(this.props);
    let interactiveNav;
    if (this.props.session.username === this.props.user.username) {
      interactiveNav = (
        <ul className="nav-session">
          <li>
            <button className="edit-btn" onClick={this.props.editProfile}>edit <i className="edit-icon fa fa-pencil" aria-hidden="true"></i></button>
          </li>
          <li>
            <button className="settings-btn" onClick={this.goToSettings}>settings <i className="fa fa-cog" aria-hidden="true"></i></button>
          </li>
          <li>
            <button className="new-message-btn" onClick={this.props.messageUser}>message<i className="message-icon sent-match fa fa-comments-o" aria-hidden="true"></i></button>
          </li>
        </ul>
      );
    } else {
      <ul className="nav-session">
        <li>
          <button className="new-message-btn" onClick={this.props.messageUser}>message<i className="message-icon fa fa-comments-o" aria-hidden="true"></i></button>
        </li>
        <li>
          <button className="match-btn" onClick={this.props.messageUser}>match with<i className="heart-icon fa fa-heart-o" aria-hidden="true"></i></button>
        </li>
      </ul>
    }
    return (
      <div>
      {interactiveNav}
      </div>
    );
  }
});
