import React from 'react';
import { Link } from 'react-router';

import store from '../store';

export default React.createClass({
  render: function() {
    let url = `${this.props.place.imageUrl}`;
    let styles = {backgroundImage: 'url(' + url + ')'};
    console.log(this.props.place);
    return (
      <li className="user-recent-places-component">
        <Link className="link" to={`/places/${this.props.place.yelpID}`}>
          <h3>{this.props.place.name}</h3>
          <div className="recent-place-image" style={styles}></div>
          <p className="snippet-text">{this.props.place.snippetText}</p>
        </Link>
      </li>
    )
  }
});
