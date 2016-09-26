import React from 'react';
import { Link } from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      showPlaceName: false,
    }
  },
  showPlaceName: function() {
    this.setState({showPlaceName: true});
  },
  hidePlaceName: function() {
    this.setState({showPlaceName: false});
  },
  render: function() {
    let url = `${this.props.place.imageUrl}`;
    let styles = {backgroundImage: 'url(' + url + ')'};
    let placeName;
    if (this.state.showPlaceName) {
      placeName = (<h3>{this.props.place.name}</h3>);
    }
    return (
      <li className="user-recent-places-component">
        <Link className="link" to={`/places/${this.props.place.yelpID}`}>
          <div className="recent-place-image"
               style={styles}
               onMouseOver={this.showPlaceName}
               onMouseLeave={this.hidePlaceName}>
               {placeName}
          </div>
        </Link>
      </li>
    )
  }
});
