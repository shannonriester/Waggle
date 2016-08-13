import React from 'react';
import { browserHistory } from 'react-router';
import Transition from 'react-addons-css-transition-group';

import store from '../store';
import Greeting from '../Components/Greeting';

export default React.createClass({
  getInitialState: function() {
    return {
      images: 0,
      interval: null,
      authtoken: null,
    }
  },
  pauseSlider: function() {
    clearInterval(this.state.interval);
  },
  startInterval: function() {
    let interval = setInterval(() => {
      if (this.state.images === store.entryImages.length - 1) {
        this.setState({images:0});
      } else {
        this.setState({images: this.state.images + 1});
      }
    }, 10000);
    this.setState({interval:interval});
  },
  updateState: function() {
    this.setState({authtoken: store.session.get('authtoken'),});
  },
  componentWillMount: function() {
    if (localStorage.authtoken) {
      store.session.retrieve();
      browserHistory.push('/search-results');
    }
  },
  componentDidMount: function() {
    this.startInterval();
    store.session.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change update', this.updateState);
  },
  render: function() {
    let styles = {backgroundImage: `url(${store.entryImages[this.state.images]})`};
    let pageContent = (<div
      className="current-image"
      key={this.state.images}
      style={styles}></div>);

    let greeting = (<Greeting showModal={this.showModal} hideModal={this.hideModal} />);
    // let childrenWithProps = {React.cloneElement(this.props.children, {hideModal: this.hideModal, showModal: this.showModal})}

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
      </div>
    );
  }
});
