import React from 'react';

import store from '../store';

export default React.createClass({
  render: function() {
    console.log(this.props);
    // console.log(this.props.place);
    // let recentPlace = store.placesCollection.getYelpResult(this.props.place.place, store.session.get('city'));
    // console.log(recentPlace);
    // this.props.place.forEach((curr, i, arr) => {
    //   console.log('curr ', curr);
    //
    //   // console.log('recentPlace ', recentPlace);
    // });
    // let recentPlace = store.checkinCollection.getYelpResult(this.props.place.place);
    // console.log(recentPlace);
    return (
      <li className="user-recent-places-component">
        <h3>{this.props.place.name}</h3>
      </li>
    )
  }
});
