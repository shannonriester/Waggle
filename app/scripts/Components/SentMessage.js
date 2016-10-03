import React from 'react';

import store from '../store';

export default React.createClass({
  deleteMessage: function(id){
    store.messagesCollection.deleteMessage(id);
  },
  componentDidMount: function() {

  },
  render: function() {
    let deleteIcon;
      if (this.props.deleteIcon) {
        deleteIcon = (<i className="delete-icon fa fa-trash-o" aria-hidden="true" onClick={this.deleteMessage.bind(null, this.props.curr._id)}></i>);
      }
      // console.log(this.props.curr._id);
    return (
      <li className={this.props.meContainer}>
        <div className={this.props.whoSent}>
        {deleteIcon}
        <div className="message-content-container">
          <p className="message-body"><span className="convo-name">{this.props.name}</span> {this.props.curr.body}</p>
          <data>{this.props.curr.momentTime}</data>
        </div>
        </div>
      </li>
    );
  }
});
