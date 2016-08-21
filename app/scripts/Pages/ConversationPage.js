import React from 'react';
import { Link } from 'react-router';
import _ from 'underscore';
import moment from 'moment';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
  getInitialState: function() {
    return {
      session: store.session.get('username'),
      recipient: store.userCollection.where({username:this.props.params.recipient}),
      messages: store.messagesCollection.toJSON(),
      conversation: store.messagesCollection.findConversation(this.props.params.recipient),
      fetched: false,
    }
  },
  sendMessage: function(e) {
    e.preventDefault();
    let sentMessage = this.refs.textbox.value;
    store.messagesCollection.sendMessage(store.session.get('username'), this.props.params.recipient, sentMessage);
  },
  updateState: function() {
    this.setState({
      session:store.session.get('username'),
      recipient: store.userCollection.where({username:this.props.params.recipient}),
      conversation: store.messagesCollection.findConversation(this.props.params.recipient),
    });

    if (this.state.session && !this.state.fetched) {
      store.messagesCollection.findMyMessages(this.state.username);
      this.setState({fetched:true});
    }
  },
  componentDidMount: function() {
    store.userCollection.fetch();
    // store.userCollection.where({username: this.props.params.recipient});

    store.session.on('change', this.updateState);
    store.userCollection.on('change update', this.updateState);
    store.messagesCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.userCollection.off('change update', this.updateState);
    store.messagesCollection.off('change update', this.updateState);
  },
  render: function() {
    let src;
    if (this.state.recipient[0]) {
      console.log();
      src = this.state.recipient[0].attributes.profile.profilePic;
    }
    let convo = _.sortBy(this.state.conversation, (message) => {
      return moment(message.get('timestamp')).unix();
    });

    convo = convo.map((curr, i, arr) => {
      curr = curr.toJSON();
      let whoSent = 'not-me';
      name = this.props.params.recipient;
      if (this.state.session === curr.sender) {
        whoSent = 'me';
        name = this.state.session;
      }

      let content = (
        <li key={i} className={whoSent}>
          <p className="message-body">{name}: {curr.body}</p>
          <data>{curr.momentTime}</data>
        </li>
      );
      return content;
    });
    return (
      <div className="message-page-container">
        <Nav/>
        <Link to={`/user/${this.props.params.recipient}`} className="link">
          <img src={src} alt="profile-picture of recipient"/>
          <h2>{this.props.params.recipient}</h2>
        </Link>
        <ul className="messages-container">
          {convo}
        </ul>
        <form className="chat-form-container" onSubmit={this.sendMessage}>
          <input type="text" role="textbox" tabIndex="1" ref="textbox" />
          <input className="submit-btn" type="submit" role="button" tabIndex="2" />
          <button onClick={this.sendMessage}>send</button>
        </form>
      </div>
    );
  }
});
