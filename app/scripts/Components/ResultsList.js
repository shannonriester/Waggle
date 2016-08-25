import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Nav from './Nav';

export default React.createClass({
    getDistance: function() {
      // store.session.getDistance();
      console.log(this.props);
    },
    routeTo: function() {
      let placeID = store.placesCollection.where({yelpID: this.props.place.yelpID});
      browserHistory.push(`/places/${placeID[0].attributes.yelpID}`);
    },
    render: function() {
      let backgroundImage = {backgroundImage: 'url(' + this.props.place.imageUrl + ')'};

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
            </main>
            <ul className="about-place">
              <li>
                <header className="caption">{category}</header>
                <i className="place-icon fa fa-map-marker" aria-hidden="true"></i>
              </li>
              <li>
                <header className="yelp-link">Yelp</header>
                <i className="yelp-icon fa fa-yelp" aria-hidden="true"></i>
              </li>
            </ul>
          </div>
        </li>
      );
    }
});
