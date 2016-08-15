import React from 'react';

import store from '../store';
import Nav from './Nav';

export default React.createClass({
    getDistance: function() {
      // store.session.getDistance();
    },
    routeTo: function() {

    },
    render: function() {
      let backgroundImage = {backgroundImage: 'url(' + this.props.place.imageUrl + ')'};

      let status = 'closed';
      if (this.props.place.isClosed) {
        status = 'open now';
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
              <header className="caption">{this.props.place.categories[0][0]}</header>
              <i className="star-icon fa fa-star" aria-hidden="true"></i>
              <footer className="caption">{status}</footer>
            </div>
          </div>
        </li>
      );
    }
});
