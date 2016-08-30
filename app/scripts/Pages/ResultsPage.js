import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import GoogleMap from 'google-map-react';


import store from '../store';
import Header from '../Components/Header';
import Searchbar from '../Components/Searchbar';
import ResultsList from '../Components/ResultsList';
import GoogleMapPage from './GoogleMapPage';

export default React.createClass({
  getInitialState: function() {
    return {
      editCity: false,
      changedCity: store.session.get('changedCity'),
      city: store.session.get('city'),
      coordinates: [],
      newCity: undefined,
      newCoordinates: [],
      query: store.session.get('query'),
      places: store.placesCollection.toJSON(),
      fetch: true,
      fetch2: true,
    }
  },
  handleChange: function(event) {
    this.setState({
      city: event.target.value,
      newCity: event.target.value,
    });
  },
  editCity: function() {
    this.setState({editCity: true});
  },
  cancelEditCity: function(e) {
    e.preventDefault();
    this.setState({editCity: false});
    this.setState({city: store.session.get('city')});
    this.refs.newCity.value = '';
  },
  updateCity: function(e) {
    e.preventDefault();
    let newCity = this.refs.newCity.value;

    $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${newCity}&key=${store.google.appKey}`,
      success: (response) => {
        let lat = response.results[0].geometry.location.lat;
        let lng = response.results[0].geometry.location.lng;
        let newCoordinates = [lat, lng];
        store.session.set('changedCity', true);
        store.session.set('newCity', newCity);
        store.session.set('newCoordinates', newCoordinates);
        store.session.updateUser();

        this.setState({
          editCity: false,
          newCity: store.session.get('newCity'),
          city: newCity,
          newCoordinates: newCoordinates,
          changedCity: store.session.get('changedCity'),
        });
        store.placesCollection.getResults(
          store.session.get('newCity'),
          store.session.get('query'),
          store.session.get('range'),
          undefined).then(() => {
            this.setState({
              places: store.placesCollection.toJSON(),
            });
        });
      }
    });
  },
  updateState: function() {
      if (!this.state.newCity) {
        this.setState({
          city: store.session.get('city'),
          newCoordinates: store.session.get('newCoordinates'),
          coordinates: store.session.get('coordinates'),
          changedCity: store.session.get('changedCity'),
          query: store.session.get('query'),
          places: store.placesCollection.toJSON(),
        });
      }

      if (this.state.city && (!this.state.changedCity) && this.state.fetch2) {
        browserHistory.push({pathname:`/search/`, query:{category: store.session.get('query')} });
        store.placesCollection.getResults(
          undefined,
          store.session.get('query'),
          store.session.get('range'),
          store.session.get('coordinates'));
        this.setState({fetch2: false});
      }
  },
  componentWillMount: function() {
    if (!localStorage.getItem('authtoken')) {
      browserHistory.push('/');
    }
  },
  componentDidMount: function() {
    this.updateState();
    store.session.on('change', this.updateState);
    store.placesCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.placesCollection.off('change update', this.updateState);
  },
  render: function() {
    let resultsList = this.state.places.map((place, i, arr) => {
      return (<ResultsList key={i} place={place} />);
    });

    let coordinates;
    let city;

    if (this.state.changedCity) {
      coordinates = this.state.newCoordinates;
      if (this.state.newCity
        && store.session.toJSON().newCity
        && this.state.newCity !== store.session.toJSON().newCity
      ) {
        city = this.state.newCity;
      } else {
        city = store.session.toJSON().newCity;
      }

    } else if (this.state.coordinates[0] !== 0 && this.state.coordinates[1] !== 0) {
      coordinates = this.state.coordinates;
      city = this.state.city;
    }

    let editCity = (
        <form className="new-city-form" onSubmit={this.updateCity}>
          <main className="new-city-main">
            <input className="new-city-input" placeholder="change city..." ref="newCity" type="text" role="textbox" tabIndex="1" onChange={this.handleChange} />
            <input className="submit-btn" type="submit" />
          </main>
          <footer className="edit-city-footer">
            <button className="submit-edit-city-btn" onClick={this.cancelEditCity}>Cancel</button>
            <button className="submit-edit-city-btn" onClick={this.updateCity}>Enter</button>
          </footer>
        </form>);
    return (
      <div className="results-page-component">
        <Header />
        <div className="results-page-container">
          <section className="search-heading-section">
            <div className="heading-icon-container">
              <h2 className="search-heading">{city}, {store.session.get('regionName')}</h2>
              {editCity}
            </div>
            <Searchbar />
          </section>

          <div className="map-container">
            <div className="map">
              <GoogleMapPage
              city={city}
              coordinates={coordinates}
              resultsList={resultsList}
              />
            </div>

          </div>
          <ul className="results-list">
            {resultsList}
          </ul>
        </div>
      </div>
    );
  }
});
