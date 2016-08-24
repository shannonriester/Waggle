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
  updateProfile: function(profilePic, bio) {
    this.set('editProfile', false);
    console.log(profilePic);
    // let profilePi
    if (!profilePic.length) {
      profilePic = '/assets/default_dog_large.png';
    }
    // this.profile.bio = bio;
    let currProfile = this.get('profile');
    currProfile.bio = bio;
    currProfile.profilePic = profilePic;
    console.log(currProfile);
    
    this.set('profile', currProfile)
  },
});

export default UserModel;
