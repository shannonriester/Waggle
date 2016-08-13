import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Header from '../Components/Header';
import Searchbar from '../Components/Searchbar';

export default React.createClass({
  getInitialState: function() {
    return {
      location: store.session.get('location'),
      places: store.placesCollection.getResults(store.session.get('location'),store.session.get('query')),
    }
  },
  updateState: function() {
    if (!localStorage.authtoken) {
      browserHistory.push('/');
    } else {
      this.setState({location: store.session.get('location')});
      store.placesCollection.getResults(store.session.get('location'),store.session.get('query'));
    }
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
