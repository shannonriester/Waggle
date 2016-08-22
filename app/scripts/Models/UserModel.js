import Backbone from 'backbone';

const UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    username: '',
    recentPlaces: [{},],
    profile: {
      usersName: '',
      profilePic: '/assets/default_dog_large.png',
      images: ['/assets/default_dog_large.png',],
      usersAge: '',
      bio: '',
    },
    dog: {
      dogName: '',
      breed: '',
      dogAge: '',
    },
    query: 'park',
    checkedin: false,
    coordinates:[0,0],
    city: '',
    zipcode: '',
    regionCode: '',
    regionName: '',
    ip: '',
    country: '',
  },
});

export default UserModel;
