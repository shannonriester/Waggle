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
      let recentCheckinPlace = this.props.recentPlaces.map((place, i) => {
        return (<RecentCheckinPlace place={place} key={i}/>);
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
