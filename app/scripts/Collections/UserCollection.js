import Backbone from 'backbone';
import $ from 'jquery';

import UserModel from '../Models/UserModel';

const UserCollection = Backbone.Collection.extend({
  model: UserModel,
  url: `https://baas.kinvey.com/user/kid_SkBnla5Y/`,
  findMe: function(username) {
    return new Promise((resolve, reject) => {
      $.ajax(`https://baas.kinvey.com/user/kid_SkBnla5Y/?query={"username":"${username}"}`).then((response) => {
        if (response.length) {
          this.add(response[0]);
          resolve(this.get(response[0]._id));
        }

      });
    });
  },
  findUser: function(username) {
    return new Promise((resolve, reject) => {
      $.ajax(`https://baas.kinvey.com/user/kid_SkBnla5Y/?query={"username":"${username}"}`).then((r) => {
        if (r.length) {
          this.add(r[0]);
          resolve(this.get(r[0]._id));
        }
      });
    });
  },
});

export default UserCollection;
