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
      interval: window.setInterval(() => {
       store.messagesCollection.fetch();
       store.messagesCollection.findConversation(this.props.params.recipient)
      }, 1000),

    }
  },
  sendMessage: function(e) {
    e.preventDefault();
    let sentMessage = this.refs.textbox.value;
    store.messagesCollection.sendMessage(store.session.get('username'), this.props.params.recipient, sentMessage);
    this.refs.textbox.value = '';
  },
  updateState: function() {
    this.setState({
      session: store.session.get('username'),
      recipient: store.userCollection.where({username:this.props.params.recipient}),
      conversation: store.messagesCollection.findConversation(this.props.params.recipient),
    });

    if (this.state.session && !this.state.fetched) {
      store.messagesCollection.findMyMessages(this.state.username);
      this.setState({
        fetched: true,
        interval: window.setInterval(() => {
         store.messagesCollection.fetch();
         store.messagesCollection.findConversation(this.props.params.recipient)
        }, 1000),
      });
    }
  },
  componentDidMount: function() {
    store.userCollection.fetch();
    store.messagesCollection.fetch();

    store.session.on('change', this.updateState);
    store.userCollection.on('update', this.updateState);
    store.messagesCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.session.off('change', this.updateState);
    store.userCollection.off('update', this.updateState);
    store.messagesCollection.off('change update', this.updateState);
    clearInterval(this.state.interval);
  },
  render: function() {
    let styles;
    if (this.state.recipient[0]) {
      let url = this.state.recipient[0].attributes.profile.profilePic;
      styles = {backgroundImage: 'url(' + url + ')'};
    }

    let convo = _.sortBy(this.state.conversation, (message) => {
      return moment(message.get('timestamp')).unix();
    });

    convo = convo.map((curr, i, arr) => {
      curr = curr.toJSON();
      if (store.session.get('username') === curr.sender || store.session.get('username') === curr.recipient) {
        let whoSent = 'not-me';
        let meContainer;
        name = this.props.params.recipient + ':';
        if (this.state.session === curr.sender) {
          whoSent = 'me';
          meContainer = 'me-container';
          name = '';
        }
        let content = (
          <li key={i} className={meContainer}>
            <div className={whoSent}>
            <p className="message-body"><span className="convo-name">{name}</span> {curr.body}</p>
            <data>{curr.momentTime}</data>
            </div>
          </li>
        );
        return content;
      }

    });
    return (
      <div className="conversation-page-component">
        <Nav/>
        <Link to={`/user/${this.props.params.recipient}`} className="link convo-with-link">
          <figure className="profile-pic" style={styles} alt="profile-picture of recipient"/>
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
