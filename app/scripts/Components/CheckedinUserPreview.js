import React from 'react';
import { Link } from 'react-router';
import _ from 'underscore';

import store from '../store';

export default React.createClass({
  render: function() {
    let profilePicUrl;
    // let user;
    // let url;
    // let styles;

    let userImg = this.props.users.map((user, iterator) => {
      let url = user.profile.profilePic[0];
      let styles = {backgroundImage: 'url(' + url + ')'};
      return styles;
    });

    console.log(userImg);

    let checkedinPreview = this.props.checkedin.map((model, i, arr) => {
      // console.log(userImg);

      return (
        <div className="userpreview-container" key={i}>
          <Link className="link" to={`/user/shannon`}>
            <figure key={i} className="userpreview-container" style={userImg[i]}></figure>
            <h3>{model.userCheckedin}</h3>
          </Link>
          <data>{model.shortTime}</data>
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
