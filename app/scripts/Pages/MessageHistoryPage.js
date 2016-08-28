import React from 'react';
import { browserHistory } from 'react-router';
import _ from 'underscore';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
  getInitialState: function() {
    return {
      session: store.session.get('username'),
      messages: store.messagesCollection.toJSON(),
      // allMyConversations: [],
      fetched: false,
    }
  },
  viewChatMessage: function(convoWith) {
    browserHistory.push(`/messages/${convoWith}`);
  },
  updateState: function() {
    this.setState({
      session: store.session.get('username'),
      messages: store.messagesCollection.toJSON(),
    });

    if (this.state.session && !this.state.fetched) {
      store.messagesCollection.findMyMessages(this.state.username);
      this.setState({fetched:true});
    }
  },
  componentDidMount: function() {
    store.messagesCollection.findMyMessages(this.state.session).then((response) => {
      this.setState({myMessages: response.toJSON() });
    });
    
    store.session.on('change', this.updateState);
    store.messagesCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.messagesCollection.off('change update', this.updateState);
  },
  render: function() {
    let allMyConversations = [];

    let messagesArr = this.state.messages.filter((curr, i, arr) => {
      let convoWith = curr.sender;
      if (this.state.session === curr.sender) {
        convoWith = curr.recipient;

        if (allMyConversations.indexOf(convoWith) === -1) {
          allMyConversations.push(convoWith);
          return true;
        }
      }

    });
    messagesArr = messagesArr.map((curr, i, arr) => {
      let convoWith = curr.sender;
      if (this.state.session === curr.sender) {
        convoWith = curr.recipient;
      }

      let messagePreview = (
        <li key={i} onClick={this.viewChatMessage.bind(null, convoWith)}>
          <h2>{convoWith}</h2>
          <data>{curr.momentTime}</data>
        </li>
      );
      return messagePreview;
    });

    return (
      <div className="message-history-page-container">
        <Nav />
        <ul className="message-list">
          {messagesArr}
        </ul>
      </div>
    );
  }
});
