import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
// import {Marker} from 'google-map-react';
import PlaceMarker from '../Components/PlaceMarker';


let GoogleMapPage = React.createClass({
  render: function() {
    return (
       <GoogleMap
        // apiKey={AIzaSyBGH9fSjS0D-dpIgVYpOUfg5F63Igifl7I} // set if you need stats etc ...
        center={[this.props.coordinates[0], this.props.coordinates[1]]}
        zoom={11}>
        <PlaceMarker lat={this.props.coordinates[0]} lng={this.props.coordinates[1]}/>
      </GoogleMap>
    );
  }
});

export default GoogleMapPage;
