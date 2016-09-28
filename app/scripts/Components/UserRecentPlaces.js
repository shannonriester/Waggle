import React from 'react';
import { Link } from 'react-router';
import _ from 'underscore';
import moment from 'moment';

import store from '../store';
import RecentCheckinPlace from './RecentCheckinPlace'

export default React.createClass({
  getInitialState: function() {
    return {
      showPlaceName: false,
      newProps: {},
    }
  },
  render: function() {
    let placeName;
    let styles;
    let url;

    // console.log(this.props.recentPlaces);

    // let placeIDArr = this.props.recentPlaces.map((place, i, arr) => {
    //     // console.log(place);
    //     return place;
    // });

    // placeIDArr = _.sortBy(placeIDArr, (place) => {
    //   return moment(place.time).unix();
    // });

    // placeIDArr = placeIDArr.reverse();
    // console.log(placeIDArr);

    let recentCheckinPlace = this.props.recentPlaces.map((place, i) => {
      return (<RecentCheckinPlace
                  place={place}
                  showTitle={this.state.showPlaceName}
                  showPlaceName={this.showPlaceName}
                  hidePlaceName={this.hidePlaceName}
                  key={i}/>)

    });

    if (recentCheckinPlace.length > 6) {
      recentCheckinPlace = recentCheckinPlace.slice(0,6);
    }

    return (
      <ul className="ul-recent-places">
        {recentCheckinPlace}
      </ul>
    )
  }
});
