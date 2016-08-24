import Backbone from 'backbone';

const UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    username: '',
    editProfile: false,
    editingDog: false,
    editingSelf: false,
    recentPlaces: [{},],
    profile: {
      profilePic: ['/assets/default_dog_large.png'],
      images: ['/assets/default_dog_large.png',],
      usersAge: '',
      bio: '',
    },
    dog: {
      dogName: '',
      dogBreed: '',
      dogAge: '',
    },
    bkgrndImgs: [],
    query: 'park',
    range: '8',
    checkedin: false,
    coordinates: [],
    city: '',
    zipcode: '',
    regionCode: '',
    regionName: '',
    ip: '',
    country: '',
    email: '',
    firstName: '',
    lastName: '',
    age: '',
  },
});

export default UserModel;
