import Backbone from 'backbone';
import $ from 'jquery';

import UserModel from '../Models/UserModel';

const UserCollection = Backbone.Collection.extend({
  model: UserModel,
  url: `https://baas.kinvey.com/user/kid_SkBnla5Y/`,
  findMe: function(username) {
    console.log(username);
    return new Promise((resolve, reject) => {
      // $.ajax(`https://baas.kinvey.com/user/kid_SkBnla5Y/?query={"username":"${username}"}`).then(resolve)
      this.fetch({
      data: {query: JSON.stringify({username: username})},
      success: (models, response) => {
        resolve(response);
      }, error: function (response) {
          console.error('FAILED TO FETCH MY MESSAGES ', response);
          reject(response);
      }});
    });
  },
  findUser: function(username) {
    // console.log(username);
    return new Promise((resolve, reject) => {
      // $.ajax(`https://baas.kinvey.com/user/kid_SkBnla5Y/?query={"username":"${username}"}`).then(resolve)
      this.fetch({
      data: {query: JSON.stringify({username: username})},
      success: (models, response) => {
        resolve(models);
      }, error: function (response) {
          console.error('FAILED TO FETCH MY MESSAGES ', response);
          reject(models);
      }});
    });
  },
  // fetchMatches:
});

export default UserCollection;
