import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';

let GoogleMapPage = React.createClass({
  render: function() {
    return (
       <GoogleMap
        // apiKey={AIzaSyBGH9fSjS0D-dpIgVYpOUfg5F63Igifl7I} // set if you need stats etc ...
        center={[this.props.coordinates[0], this.props.coordinates[1]]}
        zoom={9}>

      </GoogleMap>
    );
  }
});

export default GoogleMapPage;
