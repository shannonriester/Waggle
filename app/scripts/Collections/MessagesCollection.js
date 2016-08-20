import Backbone from 'backbone';

import MessageModel from '../Models/UserModel';

const MessagesCollection = Backbone.Collection.extend({
  model: MessageModel,
  url: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/MessagesCollection`,
  sendMessage: function() {
    console.log(this);
  },
  // findUser: function(username) {
  //   let userArr = this.where({username:username});
  //   return userArr;
  // },
  // fetchMatches:
});

export default MessagesCollection;
