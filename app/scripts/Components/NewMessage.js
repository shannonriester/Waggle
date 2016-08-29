import React from 'react';
import _ from 'underscore';

import store from '../store';

export default React.createClass({
  sendNewMessage: function(e) {
    e.preventDefault();
    let message = this.refs.textarea.value;
    store.messagesCollection.sendMessage(store.session.get('username'), this.props.recipient, message);
    this.props.hideMessageModal();
  },
  cancel: function(e) {
    e.preventDefault();
    if (_.toArray(e.target.classList).indexOf('modal-component') !== -1 || _.toArray(e.target.classList).indexOf('cancel-btn') !== -1 ) {
      this.props.hideMessageModal();
    }
  },
  render: function() {
    return (
      <div className="modal-component">
        <form id="new-message-container" onSubmit={this.sendNewMessage}>
          <button className="cancel-btn" onClick={this.cancel}>cancel</button>
          <h2>Send {this.props.recipient} a message!</h2>
          <textarea className="new-message-textarea" ref="textarea" tabIndex="0" />
          <input className="submit-btn" type="submit" value="submit" role="button" />
          <button className="send-message-btn" onClick={this.sendNewMessage} tabIndex="1">send</button>
        </form>
      </div>
    );
  }
});
