import React from 'react';

export default React.createClass({
  render: function() {
    console.log(this.props.user);
    // let user = this.props.user.filter((currUser, i, arr) => {
    //   console.log(currUser.get('usersCheckedin'));
    //   return currUser.get('usersCheckedin');
    // });
    // console.log(user);
    return (
      <li className="checkedin-user-preview-component">
        <h3>{this.props.user}</h3>
      </li>
    );
  }
});
