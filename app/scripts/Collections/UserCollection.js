import Backbone from 'backbone';

import UserModel from '../Models/UserModel';

const UserCollection = Backbone.Collection.extend({
  model: UserModel,
  url: `https://baas.kinvey.com/user/kid_SkBnla5Y/`,
  findUser: function(username) {
    console.log(username);
    return new Promise((resolve, reject) => {
      this.fetch({
      data: {query: JSON.stringify({username: username})},
      success: (response) => {
        resolve(response);
      }, error: function (response) {
          console.error('FAILED TO FETCH MY MESSAGES ', response);
          reject(response);
      }});
    });

    // let userArr = this.where({username:username});
    // return userArr;
  },
  // fetchMatches:
});

export default UserCollection;
