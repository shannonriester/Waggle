import React from 'react';
import { browserHistory } from 'react-router';
import Transition from 'react-addons-css-transition-group';

const entryImages = [
  '/../../assets/DogsAndFriendsBrunching.jpeg',
  '/../../assets/GroupAtPark.jpeg',
  '/../../TwoGirlsWithSmallDogs.jpeg',
];


export default React.createClass({
  getInitialState: function() {
    return {showing: 0}
  },
  componentDidMount: function() {
    setInterval(() => {

    }, 1000);
  },
  render: function() {
    return (
      <div className="landing-component">
        <Transition>
          <h1>The Dog Days Aren't Over</h1>
        </Transition>
      </div>
    );
  }
});
