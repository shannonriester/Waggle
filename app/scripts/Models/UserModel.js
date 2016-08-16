import Backbone from 'backbone';

const UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    username: '',
    name: 'Shannon',
    profilePic: '',
    dog: {
      name: '',
      breed: '',
      age: '',
    },
    images: [],
    age: 28,
    location: [0,0],
    bio: '',
    recentPlaces: [{},],
  },
});

export default UserModel;
