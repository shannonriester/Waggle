import React from 'react';
import { Link } from 'react-router';
import _ from 'underscore';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
        viewing: 0,
        scroll: '',
    }
  },
  scrollLeft: function(e) {
    e.preventDefault();
    this.setState({scroll:'slide-out-left'});
    window.setTimeout(() => {
      this.setState({
        scroll: 'slide-in-right',
        viewing: this.state.viewing + 3,
      });
    }, 300);
  },
  scrollRight: function(e) {
    e.preventDefault();
    this.setState({scroll: 'slide-out-right'});
    window.setTimeout(() => {
      this.setState({
        scroll: 'slide-in-left',
        viewing: this.state.viewing - 3,
    });
    }, 300);
  },
  render: function() {
    let userImg = this.props.users.map((user, iterator) => {
      return {backgroundImage:`url(${user.profile.profilePic})`};
    });
    let checkedinPreview = this.props.checkedin.map((model, i, arr) => {
      return (
        <div className="userpreview-container" key={i}>
          <Link className="link" to={`/user/${model.userCheckedin}`}>
            <figure key={i} className="figure-profile" style={userImg[i]}></figure>
            <h3>{model.userCheckedin}</h3>
          </Link>
          <data className="checkin-data">{model.shortTime}</data>
        </div>
      );
    });

    checkedinPreview = checkedinPreview.slice(this.state.viewing, this.state.viewing + 3);

    return (
      <li className="checkedin-user-preview-component">
        <h2>Checkins</h2>
        <div className="scroll-container">
          <button className="scroll-btn" onClick={this.scrollLeft}><i className="arrow-icon fa fa-arrow-left" aria-hidden="true"></i></button>
          <div id={this.state.scroll} className="preview-container">{checkedinPreview}</div>
          <button className="scroll-btn" onClick={this.scrollRight}><i className="arrow-icon fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>
      </li>
    );
  }
});
