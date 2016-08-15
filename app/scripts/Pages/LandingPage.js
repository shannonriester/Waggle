import React from 'react';
import { browserHistory } from 'react-router';
import Transition from 'react-addons-css-transition-group';

import store from '../store';
import Greeting from '../Components/Greeting';
import SessionModal from '../Components/SessionModal';

export default React.createClass({
  getInitialState: function() {
    return {
      images: 0,
      interval: null,
      hero: true,
      modal: false,
      content: 'login',
    }
  },
  pauseSlider: function() {
    clearInterval(this.state.interval);
  },
  startInterval: function() {
    let interval = setInterval(() => {
      console.log(this.state.interval);
      if (this.state.images === store.entryImages.length - 1) {
        this.setState({images:0});
      } else {
        this.setState({images: this.state.images + 1});
      }
    }, 10000);
    this.setState({interval:interval});
  },
  heroModalToggle: function(content) {
    this.setState({hero:!this.state.hero});
    this.setState({modal:!this.state.modal});
    this.setState({content:content})
  },
  updateState: function() {
    if (localStorage.authtoken) {
      store.session.retrieve();
      browserHistory.push(`/search/${store.session.get('query')}`);
    }
  },
  componentWillMount: function() {
    if (localStorage.authtoken) {
      store.session.retrieve();
      console.log('query on LandingPage', store.session.get('query'));
      browserHistory.push(`/search/${store.session.get('query')}`);
    }
  },
  componentDidMount: function() {
    this.startInterval();
    store.session.on('change', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    clearInterval(this.state.interval);

  },
  render: function() {
    let styles = {backgroundImage: `url(${store.entryImages[this.state.images]})`};
    let pageContent = (<div
      className="current-image"
      key={this.state.images}
      style={styles}></div>);

      let greeting;
      if (this.state.hero) {
        greeting = (<Greeting showModal={this.showModal} hideModal={this.hideModal} heroModalToggle={this.heroModalToggle} />);
      }

      let modal;
      if (this.state.modal) {
        modal = (<SessionModal content={this.state.content} hideModal={this.heroModalToggle}/>);
      } else if (this.state.modal === 'signup') {
        modal = (<SessionModal content={this.state.content} hideModal={this.heroModalToggle}/>);
      }

      // console.log(this.state.hero);

    return (
      <div className="landing-page-component">
        <Transition
          className="slider-wrapper"
          transitionName="slide-left"
          transitionEnterTimeout={3500}
          transitionLeaveTimeout={3500}>
          {pageContent}
        </Transition>
        {greeting}
        {modal}
      </div>
    );
  }
});
