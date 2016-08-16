import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Nav from './Nav';

export default React.createClass({
    getDistance: function() {
      // store.session.getDistance();
    },
    routeTo: function() {
      let placeID = store.placesCollection.where({yelpID: this.props.place.yelpID});
      console.log(placeID[0].attributes.yelpID);
      store.placesCollection.getYelpResult(placeID[0].attributes.yelpID);
      // browserHistory.push(`/search/${store.session.get('query')}/${placeItem[0].attributes.name}`);
      // browserHistory.push('results/'+ store.session.get('query'));
      // browserHistory.push(`/${placeItem[0].attributes.name}`);
    },
    render: function() {
      let backgroundImage = {backgroundImage: 'url(' + this.props.place.imageUrl + ')'};

      let status = 'closed';
      if (!this.props.place.isClosed) {
        status = 'open now';
      }

      let category;
      if (this.props.place.categories[0][0].indexOf('/') !== -1) {
        category = this.props.place.categories[0][0].split('/').join(' ');
      } else {
        category = this.props.place.categories[0][0];
      }

      return (
        <li className="result-item-component" onClick={this.routeTo}>
          <figure className="result-image" style={backgroundImage}>
          </figure>
          <div className="result-content-container">
            <main className="about-preview">
              <h1>{this.props.place.name}</h1>
              <p className="place-snippet">{this.props.place.snippetText}</p>
            </main>
            <div className="star-rating">
              <header className="caption">{category}</header>
              <i className="star-icon fa fa-star" aria-hidden="true"></i>
              <footer className="caption">{status}</footer>
            </div>
          </div>
        </li>
      );
    }
});
