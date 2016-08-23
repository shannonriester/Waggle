import Backbone from 'backbone';

const UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    username: '',
    isEditing: false,
    editingDog: false,
    editingSelf: false,
    recentPlaces: [{},],
    profile: {
      usersName: '',
      profilePic: ['/assets/default_dog_large.png'],
      images: ['/assets/default_dog_large.png',],
      usersAge: '',
      bio: '',
    },
    dog: {
      dogName: '',
      breed: '',
      dogAge: '',
    },
    bkgrndImgs: [],
    query: 'park',
    range: 8,
    checkedin: false,
    coordinates: [],
    city: '',
    zipcode: '',
    regionCode: '',
    regionName: '',
    ip: '',
    country: '',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    age: 0,
  },
});

export default UserModel;
