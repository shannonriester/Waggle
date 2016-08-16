import React from 'react';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
    getInitialState: function() {
      return {
        placeModel: store.placesCollection.where({name: this.props.params.place}),
        yelpItem: store.placesCollection.getYelpResult(this.props.params.placeId),
      }
    },
    // componentDidMount: function() {
    //   if (...) {
    //     this.setState({placeModel})
    //   }
    // },
    render: function() {
      let placeItem;
      if (this.state.placeModel) {
        placeItem = this.state.placeModel;
      } else {
        paceItem = this.state.yelpItem;
      }

      console.log(placeItem);
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
