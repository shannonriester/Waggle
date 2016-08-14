import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Header from '../Components/Header';
import Searchbar from '../Components/Searchbar';
import ResultsList from '../Components/ResultsList';

export default React.createClass({
  getInitialState: function() {
    return {
      location: store.session.get('location'),
      places: store.placesCollection.toJSON(),
    }
  },
  updateState: function() {
    if (!localStorage.authtoken) {
      browserHistory.push('/');
    } else {
      this.setState({location: store.session.get('location')});
      this.setState({places: store.placesCollection.toJSON()});
    }
  },
  componentWillMount: function() {
    if (!localStorage.authtoken) {
      browserHistory.push('/');
    } else {
      store.session.getLocation()
        .then(() => {
          console.log(this.state.location);
          store.placesCollection.getResults(store.session.get('location'),store.session.get('query'));
        });
    }
  },
  componentDidMount: function () {
    store.session.on('change update', this.updateState);

    store.placesCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.placesCollection.off('update change', this.updateState);
    store.session.off('change update', this.updateState);
  },
  render: function() {
    // console.log(this.state.places);
    let resultsList = this.state.places.map((place, i, arr) => {
      // console.log(place);
      return (<ResultsList key={i} place={place} />);
    });
    return (
      <div className="results-page-component">
        <Header />
        <ul className="results-list">
          {resultsList}
        </ul>
      </div>
    );
  }
});
