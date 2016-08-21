import React from 'react';

import store from '../store';

export default React.createClass({
  // getInitialState: function() {
  //   return {
  //     me: store.session.get('username')
  //   }
  // },
  render: function() {
    let url = `/assets/Icons/paw.svg`;
    let backgroundImage = {backgroundImage: 'url(' + url + ')'};

    let me;
    if (this.props.id === 'my-location') {
      me = 'my-location'
    }
    return (
      <div id={me} className="place-marker">
        <img className="paw-icon" src="/assets/Icons/paw-white.svg" alt="dog-paw-print-icon" />
      </div>
    );
  }
});
