import React from 'react';
import { Link } from 'react-router';

import store from '../store';

export default React.createClass({
  render: function() {
    let styles;
    let checkedinPreview = this.props.checkedinModels.map((currItem, i, arr) => {
      let wagglrUser = store.userCollection.findUser(currItem.attributes.userCheckedin);

      let url = wagglrUser[0].attributes.profile.images[0];
      let styles = {backgroundImage: 'url(' + url + ')'};

      return (
        <div className="userpreview-container" key={i}>
          <Link to={`/user/${currItem.attributes.userCheckedin}`}><figure className="profile-pic" style={styles}></figure></Link>
          <h3>{currItem.attributes.userCheckedin}</h3>
          <data>{currItem.attributes.shortTime}</data>
        </div>
      );
    });

    return (
      <li className="checkedin-user-preview-component">
          {checkedinPreview}
      </li>
    );
  }
});
