import React from 'react';
import { Link } from 'react-router';
import _ from 'underscore';
import moment from 'moment';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      showPlaceName: false,
      newProps: {},
    }
  },
  showPlaceName: function() {
    this.setState({showPlaceName: true});
  },
  hidePlaceName: function() {
    this.setState({showPlaceName: false});
  },
  // componentWillReceiveProps: function(newProps, obj) {
  //   // console.log(newProps);
  //   // console.log(obj);
  //   this.setState({newProps: newProps});
  // },
  render: function() {

    // let fixedPlaces = this.props.recentPlaces.map((place) => {
      // if (placeIDArr.indexOf(place.yelpID) > -1) {
      //   return true;
      // }
      // url = place.YelpID;
      // styles = {backgroundImage: `url(${place.imageUrl})`};
      let placeName;
      if (this.state.showPlaceName) {
        placeName = (<h3 className="h3-user-recent-places">{this.props.place.name}</h3>);
      }
    // });

    // if (fixedPlaces.length > 6) {
    //   fixedPlaces = fixedPlaces.slice(0,6);
    // }

    return (
      <li className="user-recent-places-component">
        <Link className="link" to={`/places/${this.props.place.yelpID}`}>
          <div className="recent-place-image"
               style={{backgroundImage:`url(${this.props.place.imageUrl})`}}
               onMouseOver={this.showPlaceName}
               onMouseLeave={this.hidePlaceName}>
               {placeName}
          </div>
        </Link>
      </li>
    );
  }
});
