import React from 'react';
import Transition from 'react-addons-css-transition-group';
import { Link } from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
        users: [],
        matches: this.props.myMatches,
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
    // console.log(this.state.users.length + ' | ' + this.state.matches.length);
    // console.log('this.state.users ', this.state.users);
    // console.log('this.state.matches', this.state.matches);
    let newPersonArr = [];
    if (this.state.fetch && (this.state.matches.length === this.state.matches.length)) {
      // console.log(this.props.myMatches.length);
      this.props.myMatches.forEach((person, i) => {
        store.userCollection.findUser(person).then((response) => {
          newPersonArr.push(response.toJSON()[0]);
          this.setState({
            users: newPersonArr,
            fetch: false,
          });
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

  },
  render: function() {
    let matchPreview;
    // console.log(this.state.users);
    // let styles = {backgroundImage: `url(${store.entryImages[this.state.images]})`};
    // <Link className="link" to={`/user/${person}`}><img src='#'/></Link>
    // <Link className="link" to={`/user/${person}`}><h3>{person}</h3></Link>
    // console.log(this);
    if (this.state.users.length) {
      matchPreview = this.state.users.map((person, i) => {
          return (
            <div className={`current-match-preview`} key={i}>
              <Link className="link" to={`/user/${person.username}`}><h3>{person.username}</h3></Link>
              <Link className="link" to={`/user/${person.username}`}><img className="match-preview-img" src={person.profile.profilePic}/></Link>
            </div>
          );
      });
      matchPreview = matchPreview.slice(this.state.viewing, this.state.viewing + 3);
    }


    return (
      <div className="my-matches-component">
        <h2>Your Matches</h2>
        <div id={this.state.scroll} className="matches-container">{matchPreview}</div>

        <button className="matches-next-btn" onClick={this.scrollLeft}>next</button>
        <button className="matches-next-btn" onClick={this.scrollRight}>previous</button>
      </div>
    );
  }
});
