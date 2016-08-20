import React from 'react';

export default React.createClass({
  render: function() {
    // <img className="paw-icon" src="/assets/Icons/paw.svg" alt="dog-paw-icon" />
    let url = `/assets/Icons/paw.svg`;
    let backgroundImage = {backgroundImage: 'url(' + url + ')'};
    return (
      <div className="place-marker">
        <img className="paw-icon" src="/assets/Icons/paw-white.svg" alt="dog-paw-print-icon" />
      </div>
    );
  }
});
