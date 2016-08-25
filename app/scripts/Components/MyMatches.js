import React, { Component } from 'react';
import { Link } from 'react-router';
var Slider = require('react-slick');

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
        user: {},
        matches: [],
    }
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({matches: newProps});
  },
  componentDidMount: function() {
    this.state.user.forEach((user, i) => {
      store.userCollection.findUser(user.username).then((response) => {
        this.setState({user: response.toJSON()[0]});
      })
    });
  },
  render: function() {
    let settings = {
      arrows: true,
      accessability: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
    }
    // <Slider ref="slider" {...settings}>
    //   <div className="match-preview-container">
    //     <Link className="link" to={`/user/{this.state.user.username}`}><h3>{this.state.user.username}</h3></Link>
    //     <Link className="link" to={`/user/{this.state.user.username}`}><img src={this.state.user.profile.profilePic[0]} /></Link>
    //   </div>
    // </Slider>

    return (
      <div className="my-matches-component">
        <h2>Your Matches</h2>

      </div>
    );
  }
});
