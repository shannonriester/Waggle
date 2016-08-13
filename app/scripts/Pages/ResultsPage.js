import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Header from '../Components/Header';
import Searchbar from '../Components/Searchbar';

export default React.createClass({
  getInitialState: function() {
    return {
      location: store.session.get('location'),
    }
  },
  updateState: function() {
    this.setState({location: store.session.get('location')});
    if (!localStorage.authtoken) {
      browserHistory.push('/');
    }
    console.log(store.session.get('location'));
  },
  componentWillMount: function() {
    if (!localStorage.authtoken) {
      browserHistory.push('/');
    } else {
      store.session.getLocation();
    }
  },
  componentDidMount: function () {
    store.session.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    // store.placesCollection.get(this.props.venue._id).off('change', this.updateState);
    store.session.off('change update', this.updateState);
  },
  render: function() {
    return (
      <div className="results-page-component">
        <Header />
      </div>
    );
  }
});
