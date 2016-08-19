import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Header from '../Components/Header';
import Searchbar from '../Components/Searchbar';
import ResultsList from '../Components/ResultsList';

export default React.createClass({
  getInitialState: function() {
    return {
      // city: store.session.get('city'),
      query: store.session.get('query'),
      places: store.placesCollection.toJSON(),
      fetch: true,
      authtoken: localStorage.authtoken,
    }
  },
  updateState: function() {
      this.setState({city: store.session.get('city')});
      this.setState({query: store.session.get('query')});
      this.setState({places: store.placesCollection.toJSON()});
      this.setState({authtoken: localStorage.authtoken});

      if (this.state.city && this.state.fetch) {
        browserHistory.push({pathname:`/search/`, query:{category: store.session.get('query')} });
        store.placesCollection.getResults(store.session.get('city'), store.session.get('query'));
        this.setState({fetch:false});
      }
      else {
        store.session.once('change:city', () => {
            browserHistory.push({pathname:`/search/`, query:{category: store.session.get('query')} });
            store.placesCollection.getResults(store.session.get('city'), store.session.get('coordinates'), this.state.query || store.session.get('query'));
          });
      }
  },
  componentWillMount: function() {
    if (!this.state.authtoken) {
      browserHistory.push('/');
    }
  },
  componentDidMount: function () {
    if (!this.state.authtoken) {
      browserHistory.push('/');
    }
    this.updateState()
    store.session.on('change', this.updateState);
    store.placesCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.placesCollection.off('update change', this.updateState);
  },
  render: function() {
    let resultsList = this.state.places.map((place, i, arr) => {
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
