import React from 'react';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
  componentDidMount: function() {
    console.log(this.props.params.messageId);
    store.messagesCollection.findMessage(this.props.params.messageId)
  },
  render: function() {
    return (
      <div className="message-page-container">
        <Nav/>
        <ul className="messages-container">
          this is the single page!
        </ul>
      </div>
    );
  }
});
