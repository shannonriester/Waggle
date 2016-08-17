import React from 'react';

export default React.createClass({
  render: function() {
    console.log('checkedinModels ', this.props.checkedinModels);

    let checkedinPreview = this.props.checkedinModels.map((currItem, i, arr) => {
      return (
        <div key={i}>
          <div className="checkedin-user-image"></div>
          <h3>{currItem.attributes.userCheckedin}</h3>
          <data>{currItem.attributes.shortTime}</data>
        </div>
      );
    });
    console.log(checkedinPreview);
    return (
      <li className="checkedin-user-preview-component">
          {checkedinPreview}
      </li>
    );
  }
});
