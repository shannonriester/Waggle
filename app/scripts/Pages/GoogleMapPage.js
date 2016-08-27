import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import PlaceMarker from '../Components/PlaceMarker';

import store from '../store';


let GoogleMapPage = React.createClass({
  clickedMap: function() {
    store.placesCollection.forEach((model) => {
      model.set('infoBox', false);
    });
  },
  render: function() {
    let myLocation;
    let center;
    let placeMarker = this.props.resultsList.map((place, i) => {
      let lat = place.props.place.ll.latitude;
      let lng = place.props.place.ll.longitude;
      return (<PlaceMarker
                key={i}
                id={place.props.place.yelpID}
                infoBox={place.props.place}
                lat={lat}
                lng={lng}
                clickedMap={this.clickedMap}
                showInfoBox={place.props.place.infoBox}
                />);
    });

    if (store.session.get('coordinates')) {
      myLocation = (<PlaceMarker
                        id="my-location"
                        lat={this.props.coordinates[0]}
                        lng={this.props.coordinates[1]}
                        onClick={this.clickedMe}
                        clickedMap={this.clickedMap}/>);

      center = [this.props.coordinates[0], this.props.coordinates[1]];
    }


    return (
       <GoogleMap
        // apiKey={AIzaSyBGH9fSjS0D-dpIgVYpOUfg5F63Igifl7I} // set if you need stats etc ...
        center={center}
        onClick={this.clickedMap}
        zoom={13}>
        {myLocation}
        {placeMarker}
      </GoogleMap>
    );
  }
});

export default GoogleMapPage;
