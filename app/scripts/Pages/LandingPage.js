import React from 'react';
import { browserHistory } from 'react-router';
import Transition from 'react-addons-css-transition-group';

import store from '../store';
// import SessionModal from '../Components/SessionModal';
import Greeting from '../Components/Greeting';

export default React.createClass({
  getInitialState: function() {
    return {
      images: 0,
      interval: null,
    }
  },
  componentWillMount: function() {
    if (localStorage.authtoken) {
      store.session.retrieve();
      browserHistory.push('/search-results');
    }
  },
  componentDidMount: function() {
    //set timeout for images[0] 8000 - 3000
    // setTimeout(() => {
    //   this.setState({this.state.images[0]});
    //
    //   let interval = setInterval(() => {
    //     if (this.state.images === store.entryImages.length - 1) {
    //       this.setState({images:1});
    //     } else {
    //       this.setState({images: this.state.images + 1});
    //     }
    //   }, 8000);
    //
    // }, 5000);
      //call back to setState to the new image and then setInterval below for the next set


    // interval.clear();
      // clearInterval(interval)
      //do this on unmount (interval has to be on the state to access)

    //clear interval and then pass in interval number (from state) -- this will stop the the setInterval from happening and changing the image
  },

  render: function() {
    console.log(browserHistory);
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
          transitionEnterTimeout={3000}
          transitionLeaveTimeout={3000}>
          {pageContent}
        </Transition>
        {greeting}
      </div>
    );
  }
});
