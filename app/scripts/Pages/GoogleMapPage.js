import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import PlaceMarker from '../Components/PlaceMarker';

import store from '../store';


let GoogleMapPage = React.createClass({
  getInitialState: function() {
    return {
      infoBox: store.placeModel.get('infoBox'),
    }
  },
  clickedMap: function() {
    store.placeModel.set('infoBox', false);
    this.updateState();
    // this.setState({clickedMap: true});
  },
  updateState: function() {
    this.setState({
      infoBox: store.placeModel.get('infoBox'),
      hideInfoBox: false,
    });
    // console.log(this.state.infoBox);
    // console.log(store.placeModel.get('infoBox'));
  },
  componendDidMount: function() {
    store.placeModel.get('infoBox');
    store.placeModel.on('change update', this.updateState);
  },
  render: function() {
    let infoBox;
    let placeMarker = this.props.resultsList.map((place, i) => {
      let lat = place.props.place.ll.latitude;
      let lng = place.props.place.ll.longitude;

      // let hideInfoBox;
      // console.log('hideInfoBox before true', hideInfoBox);
      // if (this.state.hideInfoBox) {
      //   hideInfoBox = true;
      //   console.log('hideInfoBox', hideInfoBox);
      // }
      // console.log(this.state.infoBox);
      let infoBox;
      if (this.state.infoBox) {
        infoBox = place.props.place
      }

      return (<PlaceMarker
                key={i}
                infoBox={infoBox}
                lat={lat}
                lng={lng}
                clickedMap={this.clickedMap}
                hideInfoBox={this.state.hideInfoBox}
                updateState={this.updateState}
                />);
    });

    let myLocation = (<PlaceMarker
                      id="my-location"
                      lat={this.props.coordinates[0]}
                      lng={this.props.coordinates[1]}
                      onClick={this.clickedMe}
                      clickedMap={this.clickedMap}/>);

    return (
       <GoogleMap
        // apiKey={AIzaSyBGH9fSjS0D-dpIgVYpOUfg5F63Igifl7I} // set if you need stats etc ...
        center={[this.props.coordinates[0], this.props.coordinates[1]]}
        onClick={this.clickedMap}
        zoom={11}>
        {myLocation}
        {placeMarker}
      </GoogleMap>
    );
  }
});

export default GoogleMapPage;
