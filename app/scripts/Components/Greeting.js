import React from 'react';
import { browserHistory } from 'react-router';

import SessionModal from './SessionModal';

export default React.createClass({
  getInitialState: function() {
    return {modal: null,}
  },
  showModal: function(e) {
    console.log(e.target.innerText.toLowerCase());
    if (e.target.innerText.toLowerCase() === 'login') {
      this.setState({modal:'login'});
      browserHistory.push('/login');

    } else if (e.target.innerText.toLowerCase() === 'sign up') {
      this.setState({modal: 'signup'});
      browserHistory.push('/signup');
    }
  },
  hideModal: function() {
    this.setState({modal: null});
  },
  render: function() {
    let modal;
    if (this.state.modal === 'login') {
      modal = (<SessionModal modal='login' hideModal={this.hideModal}/>);
    } else if (this.state.modal === 'signup') {
      modal = (<SessionModal modal='signup' hideModal={this.hideModal}/>);
    }

    return (
      <div className="greeting-register">
        <h1>Welcome to Waggle</h1>
        <section className="register-btns">
          <button onClick={this.showModal}>Login</button>
          <button onClick={this.showModal}>Sign Up</button>
        </section>
        {modal}
    </div>
    );
  }
});
