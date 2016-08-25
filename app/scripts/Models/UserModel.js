import Backbone from 'backbone';

const UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    username: '',
    editProfile: false,
    editingDog: false,
    editingSelf: false,
    recentPlaces: [],
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
    let currProfile = this.get('profile');
    currProfile.bio = bio;
    if (!profilePic.length) {
      console.log('if statement working');
      profilePic = currProfile.profilePic;
      // profilePic = this.profile.profilePic;
    } else {
      currProfile.profilePic = profilePic;
    }
    console.log('before setting: ', currProfile.profilePic[0].slice(0, 10));
    this.set('profile', currProfile)
  },
});

export default UserModel;
