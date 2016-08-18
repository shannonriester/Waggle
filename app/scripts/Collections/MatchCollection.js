import Backbone from 'backbone';

import UserModel from '../Models/UserModel';

const UserCollection = Backbone.Collection.extend({
  model: UserModel,
  url: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/MatchCollection`,

  // findUser: function(username) {
  //   let userArr = this.where({username:username});
  //   return userArr;
  // },
  // fetchMatches:
});

export default UserCollection;
