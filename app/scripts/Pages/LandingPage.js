import React from 'react';
import { browserHistory } from 'react-router';
import Transition from 'react-addons-css-transition-group';

import store from '../store';
import Modal from '../Components/Modal';


export default React.createClass({
  getInitialState: function() {
    return {
      images: 0,
      modal: null,
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
      this.setState({modal:'login'});
    } else if (e.target.innerText.toLowerCase() === 'sign up') {
      this.setState({modal: 'signup'});
    }
  },
  hideModal: function() {
    this.setState({modal: null});
  },
  render: function() {
    let styles = {backgroundImage: `url(${store.entryImages[this.state.images]})`};
    let pageContent = (<div
      className="current-image"
      key={this.state.images}
      style={styles}></div>);

    let modal;
    if (this.state.modal === 'login') {
      modal = (<Modal modal='login' hideModal={this.hideModal}/>);
    } else if (this.state.modal === 'signup'){
      console.log('something');
      modal = (<Modal modal='signup' hideModal={this.hideModal}/>);
    }
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
        {modal}
      </div>
    );
  }
});
