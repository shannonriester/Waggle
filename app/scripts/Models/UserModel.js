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
    // this.profile.bio = bio;
    let currProfile = this.get('profile');
    currProfile.bio = bio;
    this.set('profile', currProfile)
    // this.save(
    //   {profile: {profilePic:profilePic, bio:bio}},
    //   { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
    //     type: 'PUT',
    //     success: (model, response) => {
    //     // console.log('USER UPDATED PROFILE ', response);
    //     this.trigger('change update');
    //
    //   }, error: (e) => {
    //       console.log('updateProfile ERROR: ', e);
    //   }
    // });
  },
});

export default UserModel;
