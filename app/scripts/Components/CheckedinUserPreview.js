import React from 'react';
import { Link } from 'react-router';

import store from '../store';

export default React.createClass({
  render: function() {
    // let styles;
    console.log(this.props);
    let profilePicUrl;
    let user;
    let url;


    let checkedinPreview = this.props.checkedin.map((model, i, arr) => {
      let styles;
      let userImg = this.props.users.map((user, iterator) => {
        url = user.profile.profilePic[0];
        styles = {backgroundImage: 'url(' + url + ')'};
        return styles;
      });
      console.log(userImg[i].backgroundImage);
      return (
        <div className="userpreview-container" key={i}>
          <Link className="link" to={`/user/shannon`}>
            <figure key={i} className="userpreview-container" style={userImg[i].backgroundImage}></figure>
            <h3>{model.userCheckedin}</h3>
          </Link>
          <data>{model.shortTime}</data>
        </div>
      );
    });
    // });
      // let wagglrUser = store.userCollection.where({username:model.userCheckedin});
      // console.log(wagglrUser);
    //   // console.log(store.userCollection);
    //   let url;
    //   // if (wagglrUser[0].attributes.profile.profilePic[0]) {
    // //     // console.log(wagglrUser[0].attributes.profile);
    // //   } else if (wagglrUser[0].attributes.profile.profilePic) {
    // //     console.log(wagglrUser[0].attributes.profile);
    // //     url = wagglrUser[0].attributes.profile.profilePic;           <data>{model.}</data>
    //
    // //   }
    // //
    //   return (
    //       <Link className="link" to={`/user/${model.username}`}><figure className="profile-pic" style={styles}></figure>
    //       <h3>{model.username}</h3>
    //       </Link>
    //     </div>
    //   );
    // // });

    return (
      <li className="checkedin-user-preview-component">
        {checkedinPreview}
      </li>
    );
  }
});
