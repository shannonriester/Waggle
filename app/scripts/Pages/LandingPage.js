import React from 'react';
import { browserHistory } from 'react-router';
import Transition from 'react-addons-css-transition-group';

import store from '../store';


export default React.createClass({
  getInitialState: function() {
    return {showing: 0}
  },
  componentDidMount: function() {
    setInterval(() => {
      if (this.state.showing === store.entryImages.length - 1) {
        this.setState({showing:0});
      } else {
        this.setState({showing: this.state.showing + 1});
      }
    }, 5000);
  },
  render: function() {
    let image = (<img
      key={this.state.showing}
      src={store.entryImages[this.state.showing]}
      className="current"/>);

    return (
      <div className="landing-page-component">
        <h1>The Dog Days Aren't Over</h1>
        <Transition
          transitionName="slide-left"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={2000}>
          {image}
        </Transition>
      </div>
    );
  }
});
