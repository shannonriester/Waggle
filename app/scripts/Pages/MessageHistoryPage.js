import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
  getInitialState: function() {
    return {
      session: store.session.get('username'),
      messages: store.messagesCollection.toJSON(),
      myMessages: store.messagesCollection.findMyMessages(store.session.get('username')),
    }
  },
  viewChatMessage: function(id) {
    // console.log(id);
    // console.log(e);
    // console.log(e);
    browserHistory.push(`/messages/${id}`);
  },
  updateState: function() {
    this.setState({messages: store.messagesCollection.toJSON()});
    this.setState({session: store.session.get('username')});
    this.setState({myMessages:store.messagesCollection.findMyMessages(store.session.get('username'))});
  },
  componentDidMount: function() {
    store.messagesCollection.fetch();
    // console.log(this.state.session);
    store.messagesCollection.on('change update', this.updateState);
    store.session.on('change', this.updateState);
  },
  componentWillUnmount: function() {
    store.messagesCollection.off('change update', this.updateState);
    store.session.off('change', this.updateState);
  },
  render: function() {
    let messagesArr = this.state.myMessages.map((curr, i, arr) => {
      let messagePreview = (
        <li key={i} onClick={this.viewChatMessage.bind(null,`${curr.attributes._id}`)}>
          <h2>{curr.attributes.recipient}</h2>
          <p>{curr.attributes.body}</p>
        </li>
      );
      // console.log(curr.attributes);
      return messagePreview;
    });
    return (
      <div className="message-history-page-container">
        <Nav />
        <ul>
          {messagesArr}
        </ul>
      </div>
    );
  }
});
