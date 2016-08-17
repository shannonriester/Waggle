import Backbone from 'backbone';

const UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    username: '',
    name: '',
    profilePic: '',
    dog: {
      name: '',
      breed: '',
      age: '',
    },
    images: [],
    age: 0,
    location: [0,0],
    bio: '',
    recentPlaces: [{},],
  },
});

export default UserModel;
