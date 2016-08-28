import React from 'react';
import { browserHistory } from 'react-router';
import GoogleMap from 'google-map-react';


import store from '../store';
import Header from '../Components/Header';
import Searchbar from '../Components/Searchbar';
import ResultsList from '../Components/ResultsList';
import GoogleMapPage from './GoogleMapPage';

export default React.createClass({
  getInitialState: function() {
    return {
      city: store.session.get('city'),
      coordinates: [],
      query: store.session.get('query'),
      places: store.placesCollection.toJSON(),
      fetch: true,
    }
  },
  updateState: function() {
      this.setState({
        city: store.session.get('city'),
        coordinates: store.session.get('coordinates'),
        query: store.session.get('query'),
        places: store.placesCollection.toJSON(),
      });

      if (this.state.city && this.state.fetch) {
        browserHistory.push({pathname:`/search/`, query:{category: store.session.get('query')} });
        store.placesCollection.getResults(
          store.session.get('city'),
          store.session.get('query'),
          store.session.get('range'),
          store.session.get('coordinates')
        );
        this.setState({fetch: false});
      }
      // else if (!this.state.city && !this.state.fetch) {
      //   store.session.on('change: city', () => {
      //       browserHistory.push({ pathname:`/search/`, query: {category: store.session.get('query')} });
      //       store.placesCollection.getResults(
      //         store.session.get('city'),
      //         store.session.get('query'),
      //         store.session.get('range'),
      //         store.session.get('coordinates')
      //       );
      //     });
      // }
  },
  componentWillMount: function() {
    if (!localStorage.authtoken) {
      browserHistory.push('/');
    }
  },
  componentDidMount: function () {
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

    let coordinates = [0,0];
    if (this.state.coordinates[0] !== 0 && this.state.coordinates[1] !== 0) {
      coordinates = store.session.get('coordinates');
    }

    return (
      <div className="results-page-component">
        <Header />
        <div className="map-container">
          <div className="map">
            <GoogleMapPage
            coordinates={coordinates}
            resultsList={resultsList}
            />
          </div>
          <h2 className="search-heading">{this.state.city}, {store.session.get('regionName')}</h2>
          <p className="search-sub-heading">Waggle On, Wag Along...</p>
          <Searchbar />
        </div>
        <ul className="results-list">
          {resultsList}
        </ul>
      </div>
    );
  }
});
