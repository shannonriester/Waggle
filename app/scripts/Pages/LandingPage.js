import React from 'react';
import { browserHistory } from 'react-router';
import Transition from 'react-addons-css-transition-group';

import store from '../store';


export default React.createClass({
  getInitialState: function() {
    return {
      images: 0,
      modal: false,
    }
  },
  componentDidMount: function() {
    setInterval(() => {
      if (this.state.images === store.entryImages.length - 1) {
        this.setState({images:0});
      } else {
        this.setState({images: this.state.images + 1});
      }
    }, 5000);
  },
  showModal: function(e) {
    console.log(e.target.innerText.toLowerCase());
    if (e.target.innerText.toLowerCase() === 'login') {
      this.setState({})
    }
  },
  render: function() {
    let styles = {backgroundImage: `url(${store.entryImages[this.state.images]})`};
    let pageContent = (<div
      className="current-image"
      key={this.state.images}
      style={styles}></div>);

    return (
      <div className="landing-page-component">
        <div className="greeting-register">
          <h1>Welcome to Waggle</h1>
          <section className="register-btns">
            <button onClick={this.showModal}>Login</button>
            <button onClick={this.showModal}>Sign Up</button>
          </section>
        </div>
        <Transition
          transitionName="slide-left"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={2000}>
          {pageContent}
        </Transition>

      </div>
    );
  }
});
