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
      if (!this.state.placeModel) {
        this.setState({yelpItem: store.placesCollection.getYelpResult(this.props.params.placeId)});
      }
      this.setState({placeModel: store.placesCollection.findWhere({yelpID: this.props.params.placeId})});
    },
    componentDidMount: function() {
      store.placesCollection.on('change update', this.updateState);
      store.placesCollection.getYelpResult(this.props.params.placeId);
    },
    render: function() {
      let placeItem;
      if (this.state.placeModel) {
        placeItem = this.state.placeModel;
      } else {
        placeItem = this.state.yelpItem;
      }
      console.log('placeItem', placeItem.attributes);

      let styles;
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
