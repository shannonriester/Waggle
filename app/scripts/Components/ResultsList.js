import React from 'react';

import Nav from './Nav';

export default React.createClass({
    render: function() {
      console.log(this.props.place);
      let styles = {backgroundImage: 'url(' + this.props.place.image[0] + ')'};
      return (
        <li className="result-item-component">
          <div className="result-image" style={styles}></div>
          <div className="result-content-container">
            <h1>{this.props.place.venueName}</h1>
            <ul className="address-container">
              <li className="li-address">{this.props.place.location.address}</li>
              <li className="li-address">{this.props.place.location.city}, {this.props.place.location.state} {this.props.place.zip}</li>
            </ul>
          </div>
        </li>
      );
    }
});
