import Backbone from 'backbone';

const UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    username: '',
    profile: {
      usersName: '',
      images: ['/assets/default_dog_large.png',],
      usersAge: '',
      bio: '',
      recentPlaces: [{},],
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
