import Backbone from 'backbone';

import UserModel from '../Models/UserModel';

const UserCollection = Backbone.Collection.extend({
  model: UserModel,
  url: `https://baas.kinvey.com/user/kid_SkBnla5Y/`,
});

export default UserCollection;
