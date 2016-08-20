import React from 'react';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
  getInitialState: function() {
    return {
      messages: store.messagesCollection.toJSON(),
      // messages: store.messagesCollection.get('messages'),
    }
  },
  updateState: function() {
    // this.setState({session: store.session.toJSON()});
    this.setState({messages: store.messagesCollection.toJSON()});
  },
  componentDidMount: function() {
    store.messagesCollection.fetch();
    // store.messagesCollection.sendMessage();
    // console.log(store.session.get('messages'));
    store.messagesCollection.on('change', this.updateState);
    // store.userCollection.on('change', this.updateState);
  },
  componentWillUnmount: function() {
    store.messagesCollection.off('change', this.updateState);
  },
  render: function() {
    // let message = store.session.get('messages');
    console.log(this.state.messages);
    return (
      <div className="message-history-page-container">
        <Nav />
        <ul>
          <li>
            <p>your messages will go here</p>
          </li>
        </ul>
      </div>
    );
  }
});
