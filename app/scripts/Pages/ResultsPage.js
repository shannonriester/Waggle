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
      editCity: false,
      newCity: store.session.get('newCity'),
      coordinates: [],
      query: store.session.get('query'),
      places: store.placesCollection.toJSON(),
      fetch: true,
    }
  },
  handleChange: function(event) {
    this.setState({newCity: event.target.value});
  },
  editCity: function() {
    this.setState({editCity: true});
  },
  hideEditCity: function(e) {
    e.preventDefault();
    this.setState({editCity: false});
  },
  updateCity: function(e) {
    e.preventDefault();
    let newCity = this.refs.newCity.value;
    console.log(newCity);
    store.session.set('newCity', newCity);
    store.session.updateUser();
    this.setState({
      editCity: false,
      newCity: newCity,
    });
    this.updateState();
  },
  updateState: function() {
      this.setState({
        city: store.session.get('city'),
        newCity: store.session.get('newCity'),
        coordinates: store.session.get('coordinates'),
        query: store.session.get('query'),
        places: store.placesCollection.toJSON(),
      });

      console.log('session in updateState()', store.session);

      if (this.state.newCity && this.state.fetch) {
        browserHistory.push({pathname:`/search/`, query:{category: store.session.get('query')} });
        console.log('if statement working');
        store.placesCollection.getResults(
          this.state.newCity,
          store.session.get('query'),
          store.session.get('range'));
        this.setState({fetch: false});

      } else if (this.state.city && this.state.fetch) {
        browserHistory.push({pathname:`/search/`, query:{category: store.session.get('query')} });
        store.placesCollection.getResults(
          store.session.get('city'),
          store.session.get('query'),
          store.session.get('range'),
          store.session.get('coordinates'));
        this.setState({fetch: false});
      }
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
    let city = this.state.city;
    let resultsList = this.state.places.map((place, i, arr) => {
      return (<ResultsList key={i} place={place} />);
    });

    let coordinates = [0,0];
    if (this.state.coordinates[0] !== 0 && this.state.coordinates[1] !== 0) {
      coordinates = store.session.get('coordinates');
    }

    let editCity;
    if (this.state.editCity) {
      editCity = (
        <form className="new-city-form" onSubmit={this.updateCity}>
          <input className="new-city-input" ref="newCity" type="text" role="textbox" tabIndex="1" onChange={this.handleChange} />
          <input className="submit-btn" type="submit" />
          <footer className="edit-city-footer">
            <button className="submit-edit-city-btn" onClick={this.hideEditCity}>Cancel</button>
            <button className="submit-edit-city-btn" onClick={this.updateCity}>Enter</button>
          </footer>
        </form>);
    } else {
      editCity = (<i className="globe-icon fa fa-cog" aria-hidden="true" onClick={this.editCity}> Change city? </i>);
    }

    if (this.state.newCity && (this.state.newCity !== ' ' || this.state.newCity !== '')) {
     city = this.state.newCity;
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
          <section className="search-heading-section">
            <h2 className="search-heading">{city}, {store.session.get('regionName')}</h2>
            {editCity}
            <p className="search-sub-heading">Waggle On, Wag Along...</p>
            <Searchbar />
          </section>
        </div>
        <ul className="results-list">
          {resultsList}
        </ul>
      </div>
    );
  }
});
