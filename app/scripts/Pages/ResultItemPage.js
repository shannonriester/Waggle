import React from 'react';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
    getInitialState: function() {
      return {
        placeModel: store.placesCollection.where({name: this.props.params.place}),
        // yelpItem: store.placesCollection.getYelpResult(this.props.params.placeId),
      }
    },
    updateState: function() {
      console.log('change or update detected');
      if (!this.state.placeModel) {
        console.log('no place model found, fetching again');
        this.setState({yelpItem: store.placesCollection.getYelpResult(this.props.params.placeId)});
      }
      this.setState({placeModel: store.placesCollection.findWhere({yelpID: this.props.params.placeId})});
    },
    componentDidMount: function() {

      store.placesCollection.on('change update', this.updateState);
      // this.state.placeModel.on('change update', this.updateState);
      console.log(store.placesCollection.getYelpResult(this.props.params.placeId));
      let placeItem;
      if (this.state.placeModel) {
        placeItem = this.state.placeModel;
      } else {
        placeItem = this.state.yelpItem;
      }
    },
    render: function() {
      console.log('state.placemodel:', this.state.placeModel);
      // console.log(this.state.yelpItem);


      // let placeModel = store.placesCollection.where({name: this.props.params.place});
      // let place = placeModel[0].attributes;
      //   console.log(place);
      // let styles;
      // styles = {backgroundImage: 'url(' + place.imageUrl + ')'};

      // <div className="result-image" style={styles}>
      //   <h1>{place.name}</h1>
      //   <button className="checkin-btn">Check-In</button>
      // </div>
      return (
        <div className="result-item-component">
          <Nav />

        </div>
      );
    }
});
