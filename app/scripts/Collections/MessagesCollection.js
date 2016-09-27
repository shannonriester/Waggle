import Backbone from 'backbone';
import _ from 'underscore';

import MessageModel from '../Models/MessageModel';

const MessagesCollection = Backbone.Collection.extend({
  model: MessageModel,
  url: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/MessagesCollection`,
  querySessionMessages: function(username) {

  },
  sendMessage: function(session, recipient, message) {

    this.create({
      sender:session,
      recipient:recipient,
      body:message,
      timestamp: new Date(),
    },{
      success: (model, response) => {
      },
      error: function() {
          console.error('FAILED TO CREATE NEW MESSAGE', response);
      }
      });
  },
  findMyMessages: function(me) {
    let query = [{sender:me},{recipient:me}];
    query = JSON.stringify(query);

    return new Promise((resolve, reject) => {
      this.fetch({url:`https://baas.kinvey.com/appdata/kid_SkBnla5Y/MessagesCollection?query={"$or":${query}}`,
      success: (response) => {
        resolve(response);
      }, error: function (response) {
          console.error('FAILED TO FETCH MY MESSAGES ', response);
          reject();
      }});
    });
  },
  findMessageModel: function(id) {
    return this.findWhere({_id:id});
  },
  findConversation: function(recipient) {
    let convoArr = [];
    convoArr.push(this.where({recipient:recipient}));
    convoArr.push(this.where({sender:recipient}));
    return _.flatten(convoArr);
  },
  // findUser: function(username) {
  //   let userArr = this.where({username:username});
  //   return userArr;
  // },
  // fetchMatches
});

export default MessagesCollection;
