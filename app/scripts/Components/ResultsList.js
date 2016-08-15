import React from 'react';

import store from '../store';
import Nav from './Nav';

export default React.createClass({
    getDistance: function() {
      // store.session.getDistance();
    },
    render: function() {
      let backgroundImage = {backgroundImage: 'url(' + this.props.place.imageUrl + ')'};
      // let color;
      // if (this.props.place.yelpRating === 5) {
      //   color = {backgroundColor: '#10e471'};
      // } else if (this.props.place.yelpRating === 4) {
      //   color = {backgroundColor: 'rgba(#10e471, 0.69)'};
      // } else if (this.props.place.yelpRating === 3) {
      //   color = {backgroundColor: '#ebff00'};
      // } else if (this.props.place.yelpRating === 2) {
      //   color = {backgroundColor: '#ffa100'};
      // } else {
      //   color = {backgroundColor: '#da3400'};
      // }

      let status = 'closed';
      if (this.props.place.isClosed) {
        status = 'open now';
      }
      // <ul className="address-container">
      //   <li className="li-address">
      //     {this.props.place.address[0]}
      //     {this.props.place.address[1]}
      //   </li>
      // </ul>

      return (
        <li className="result-item-component">
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
