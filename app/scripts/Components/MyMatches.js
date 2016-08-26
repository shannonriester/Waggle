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
    }
  },
  scrollLeft: function(e) {
    e.preventDefault();
    this.setState({scroll:'scroll-left'});
  },
  updateState: function() {
    // if (this.state.users.length !== this.state.matches.length) {
    //   this.props.myMatches.forEach((person, i) => {
    //     store.userCollection.findUser(person).then((response) => {
    //       this.setState({users: response.toJSON()});
    //     })
    //   });
    // }
  },
  componentWillReceiveProps: function(newProps) {
    console.log('receiving props');
    this.setState({matches: newProps.myMatches});

    console.log(newProps.myMatches);
    console.log(this.state.users.length + '|' + newProps.myMatches.length);
    // if (this.state.users.length !== newProps.myMatches.length) {
    //   this.props.myMatches.forEach((person, i) => {
    //     store.userCollection.findUser(person).then((response) => {
    //       this.setState({users: response.toJSON()});
    //     })
    //   });
    // }
    this.updateState();
  },
  componentDidMount: function() {

  },
  render: function() {
    let matchPreview;
    // console.log(this.state.users);
    // let styles = {backgroundImage: `url(${store.entryImages[this.state.images]})`};
    // <Link className="link" to={`/user/${person}`}><img src='#'/></Link>
    // <Link className="link" to={`/user/${person}`}><h3>{person}</h3></Link>
    if (this.state.users.length) {
      matchPreview = this.state.users.map((person, i) => {
        // console.log(person);
          return (
            <div id={this.state.scroll} className="current-match-preview" key={person.userId}>
              <Link className="link" to={`/user/${person.username}`}><h3>{person.username}</h3></Link>
              <Link className="link" to={`/user/${person.username}`}><img className="match-preview-img" src={person.profile.profilePic}/></Link>
            </div>
          );

      });
    }


    return (
      <div className="my-matches-component">
        <h2>Your Matches</h2>
        <div className="matches-container">{matchPreview}</div>

        <button className="matches-next-btn" onClick={this.scrollLeft}>next</button>
      </div>
    );
  }
});
