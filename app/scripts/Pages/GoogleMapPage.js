import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import PlaceMarker from '../Components/PlaceMarker';


let GoogleMapPage = React.createClass({
  render: function() {
    let placeMarker = this.props.resultsList.map((place, i) => {
      let lat = place.props.place.ll.latitude;
      let lng = place.props.place.ll.longitude;
      return (<PlaceMarker key={i} lat={lat} lng={lng}/>);
    });

    let myLocation = (<PlaceMarker
                      id="my-location"
                      lat={this.props.coordinates[0]}
                      lng={this.props.coordinates[1]} />);

    return (
       <GoogleMap
        // apiKey={AIzaSyBGH9fSjS0D-dpIgVYpOUfg5F63Igifl7I} // set if you need stats etc ...
        center={[this.props.coordinates[0], this.props.coordinates[1]]}
        zoom={11}>
        {myLocation}
        {placeMarker}
      </GoogleMap>
    );
  }
});

export default GoogleMapPage;
