import React from 'react';
import { Link } from 'react-router';

import store from '../store';

export default React.createClass({
  componentWillMount: function() {
  },
  componentDidMount: function() {

  },
  render: function() {
    let styles;
    // console.log(store.userCollection);
    let checkedinPreview = this.props.checkedinModels.map((currItem, i, arr) => {


      let wagglrUsers = store.userCollection.findCheckedinUser(currItem.attributes.userCheckedin);
      // console.log(wagglrUsers);
      let wagglr;
      wagglrUsers.forEach((wagglr) => {
        console.log(wagglr);
      });
      // let url = currItem.attributes.
      let url = `/assets/default_dog_large.png`;
      // let url = `https://dl.dropboxusercontent.com/u/19411356/Wagglr/ShannonRiester.jpg`;
      let styles = {backgroundImage: 'url(' + url + ')'};
      return (
        <div className="userpreview-container" key={i}>
          <Link to={`/user/${currItem.attributes.userCheckedin}`}><div className="checkedin-user-image" style={styles}></div></Link>
          <h3>{currItem.attributes.userCheckedin}</h3>
          <data>{currItem.attributes.shortTime}</data>
        </div>
      );
    });
    // console.log(checkedinPreview);
    return (
      <li className="checkedin-user-preview-component">
          {checkedinPreview}
      </li>
    );
  }
});
