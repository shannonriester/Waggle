import React from 'react';
import Transition from 'react-addons-css-transition-group';
import { Link } from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
        users: [],
        matches: [],
        scroll: '',
        fetch: true,
        viewing: 0,
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
  updateState: function() {
    let newPersonArr = [];
    if (this.state.fetch && this.state.matches.length) {
      this.state.matches.forEach((person, i) => {
        store.userCollection.findUser(person).then((response) => {
          newPersonArr.push(response.toJSON());

          if (newPersonArr.length === this.state.matches.length) {
            this.setState({
              users: newPersonArr,
              fetch: false,
            });
          }

        })

      });
    }
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({matches: newProps.myMatches});
    if (newProps.myMatches !== this.state.matches) {
      this.updateState();

    }
  },
  componentDidMount: function() {
    this.updateState();
  },
  render: function() {
    let matchPreview;
    if (this.state.users.length) {
      matchPreview = this.state.users.map((person, i) => {
          return (
            <div className="current-match-preview" key={i}>
              <Link className="link" to={`/user/${person.username}`}><h3 className="match-heading">{person.username}</h3></Link>
              <Link className="link" to={`/user/${person.username}`}><img className="match-preview-img" src={person.profile.profilePic}/></Link>
            </div>
          );
      });
      matchPreview = matchPreview.slice(this.state.viewing, this.state.viewing + 3);
    }

    return (
      <div>
        <h2>Your Matches</h2>
        <div className="scroll-container">
          <button className="scroll-btn" onClick={this.scrollLeft}><i className="arrow-icon fa fa-arrow-left" aria-hidden="true"></i></button>
          <div id={this.state.scroll} className="preview-container">{matchPreview}</div>
          <button className="scroll-btn" onClick={this.scrollRight}><i className="arrow-icon fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>
      </div>
    );
  }
});
