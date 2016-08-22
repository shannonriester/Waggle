import React from 'react';
import { Link } from 'react-router';

import store from '../store';

export default React.createClass({
  render: function() {
    let styles;
    let checkedinPreview = this.props.checkedinModels.map((currItem, i, arr) => {
      let wagglrUser = store.userCollection.findUser(currItem.attributes.userCheckedin);
      // console.log(wagglrUser[0].attributes.profile);
      let url;
      if (wagglrUser[0].attributes.profile.profilePic[0]) {
        url = wagglrUser[0].attributes.profile.profilePic[0];
      } else if (wagglrUser[0].attributes.profile.images[0]) {
        url = wagglrUser[0].attributes.profile.images[0];
      }
      let styles = {backgroundImage: 'url(' + url + ')'};

      return (
        <div className="userpreview-container" key={i}>
          <Link className="link" to={`/user/${currItem.attributes.userCheckedin}`}><figure className="profile-pic" style={styles}></figure>
          <h3>{currItem.attributes.userCheckedin}</h3>
          <data>{currItem.attributes.shortTime}</data>
          </Link>
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
