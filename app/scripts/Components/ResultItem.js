import React from 'react';

import Nav from './Nav';

export default React.createClass({
    render: function() {
      console.log(this.props.place);
      let styles = {backgroundImage: 'url(' + this.props.place.image[0] + ')'};
      return (
        <div className="result-item-component">
          <div className="result-image" style={styles}>
            <h1>{this.props.place.venueName}</h1>
            <button className="checkin-btn">Check-In</button>
          </div>
        </div>
      );
    }
});
