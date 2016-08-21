import React from 'react';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      // session: store.session.get('username');
    }
  },
  sendNewMessage: function(e) {
    e.preventDefault();
    let message = this.refs.textarea.value;
    store.messagesCollection.sendMessage(store.session.get('username'), this.props.recipient, message);
    this.props.hideMessageModal();
  },
  cancel: function(e) {
    e.preventDefault();
    this.props.hideMessageModal();
  },
  componentDidMount: function() {

  },
  render: function() {
    return (
      <div className="modal-component">
        <form className="message-content-container" onSubmit={this.sendNewMessage}>
          <button className="cancel-btn" onClick={this.cancel}>cancel</button>
          <h2>Send {this.props.recipient} a message!</h2>
          <input type="text" className="new-message-textarea" ref="textarea" tabIndex="0" />
          <input className="submit-btn" type="submit" value="submit" role="button" />
          <button className="send-message-btn" onClick={this.sendNewMessage} tabIndex="1">send</button>
        </form>
      </div>
    );
  }
});
