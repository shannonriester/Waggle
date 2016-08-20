import React from 'react';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
  render: function() {
    return (
      <div className="message-page-container">
        <Nav/>
        <ul className="messages-container">

        </ul>
      </div>
    );
  }
});
