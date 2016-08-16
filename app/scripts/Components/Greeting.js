import React from 'react';
import { browserHistory } from 'react-router';

import SessionModal from './SessionModal';

export default React.createClass({
  showModal: function(e) {
    this.props.heroModalToggle(e.target.innerText.toLowerCase());
  },
  render: function() {
    return (
      <div className="greeting-register">
        <h1>Welcome to Waggle</h1>
        <section className="register-btns">
          <button onClick={this.showModal}>Login</button>
          <button onClick={this.showModal}>Sign Up</button>
        </section>
    </div>
    );
  }
});
