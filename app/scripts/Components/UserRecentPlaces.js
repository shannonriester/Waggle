import React from 'react';
import { Link } from 'react-router';

import store from '../store';

export default React.createClass({
  render: function() {
    let url = `${this.props.place.imageUrl}`;
    let styles = {backgroundImage: 'url(' + url + ')'};
    return (
      <li className="user-recent-places-component">
        <Link className="link" to={`/places/${this.props.place.yelpID}`}>
          <div className="recent-place-image"
               style={styles}
               onMouseOver={this.showPlace}
               >
            <h3>{this.props.place.name}</h3>
          </div>
          <p className="snippet-text">{this.props.place.snippetText}</p>
        </Link>
      </li>
    )
  }
});
