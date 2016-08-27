import Backbone from 'backbone';
import $ from 'jquery';

const SessionModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/user/kid_SkBnla5Y/`,
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
updateUser: function() {
    this.save(null,
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
        type: 'PUT',
        success: (model, response) => {
          this.trigger('change update');
        console.log('UPDATED USER ', response);
      }, error: (e) => {
          console.log('SESSION.UPDATEUSER ERROR: ', e);
      }
    });
  },
  updateDogInfo: function(dogName, dogBreed, dogAge) {
    this.set('editingDog', false);
    this.save(
      {dog:{dogName:dogName, dogBreed:dogBreed, dogAge:dogAge}},
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
        type: 'PUT',
        success: (model, response) => {
        // console.log('USER UPDATED DOG ', response);
        this.trigger('change update');
      }, error: (e) => {
          console.log('UPDATE DOG INFO ERROR: ', e);
      }
    });
  },
  updateUserInfo: function(email, firstName, lastName, age) {
    this.set('editingSelf', false);
    this.save(
      {email:email, firstName:firstName, lastName:lastName, age:age},
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
        type: 'PUT',
        success: (model, response) => {
        // console.log('USER UPDATED SELF ', response);
        this.trigger('change update');
      }, error: (e) => {
          console.log('UPDATE USER INFO ERROR: ', e);
      }
    });
  },
  updateProfile: function(profilePic, bio) {
    this.set('editProfile', false);
    let currProfile = this.get('profile');
    currProfile.bio = bio;
    if (!profilePic.length) {
      profilePic = currProfile.profilePic;
      // profilePic = this.profile.profilePic;
    } else {
      currProfile.profilePic = profilePic;
    }
    this.set('profile', currProfile)
    this.save(
      {profile: {profilePic:profilePic, bio:bio}},
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
        type: 'PUT',
        success: (model, response) => {
        // console.log('USER UPDATED PROFILE ', response);
        this.trigger('change update');
      }, error: (e) => {
          console.log('updateProfile ERROR: ', e);
      }
    });
  },
  updateBkgrndImgs: function(bkgrndImgs, bio) {
    this.set('isEditing', false);
    this.save({bkgrndImgs: bkgrndImgs, profile: {bio: bio}},
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
        type: 'PUT',
        success: (model, response) => {
        console.log('USER UPDATED BACKGROUND IMAGES ', response);
        this.trigger('change update');
      }, error: (e) => {
          console.log('updateProfile ERROR: ', e);
      }
    });
  },
  apiGeoLocation: function() {
    return $.ajax({
      type: 'GET',
      url: `https://freegeoip.net/json/`,
      success: (response) => {
        let coordinates = [response.latitude, response.longitude];
        // console.log('coordinates in geoLocation', coordinates);
        this.set({
            coordinates,
            city: response.city,
            zipcode: response.zip_code,
            regionCode: response.region_code,
            regionName: response.region_name,
            country: response.country_name,
            ip: response.ip,
        });
        if (this.get('username')) {
          // this.updateUser();
          // console.log('session in the geoLocation ', this);
        }
      },
      error: (e) => {
        console.log('apiGeoLocation ERROR: ', e);
      }
    });
  },
  parse: function(response) {
    if (response) {
      return {
        _id: response._id,
        username: response.username,
        userId: response._id,
        authtoken: response._kmd.authtoken,
        profile: response.profile,
        bkgrndImgs: response.bkgrndImgs,
        messages: response.messages,
        dog: response.dog,
        checkedin: false,
        coordinates:response.coordinates,
        city: response.city,
        regionCode: response.regionCode,
        regionName: response.regionName,
        country: response.countryName,
        ip: response.ip,
        recentPlaces: response.recentPlaces,
        range: response.range,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        age: response.age,
      };
    }
  },
  login: function(username, password) {
    let newUsername = username.toLowerCase();
    this.save(
      { username: newUsername, password: password},
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/login`,
        success: (model, response) => {
          localStorage.setItem('authtoken', response._kmd.authtoken);
          this.unset('password');
          this.trigger('change update');
          console.log('USER SIGNED IN', newUsername);
      },
       error: function(model, response) {
         throw new Error('LOGIN FAILED');
      },
    });
  },
  signup: function(username, password, email, firstName, lastName, age) {
    let newUsername = username.toLowerCase();
    this.save({
      username: newUsername,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      age: age,
    },
    {
      url: `https://baas.kinvey.com/user/kid_SkBnla5Y/`,
      success: (model, response) => {
        localStorage.removeItem('authtoken');
        localStorage.setItem('authtoken', response._kmd.authtoken);
        this.unset('password');
        this.trigger('change update');
        console.log('USER SIGNED UP!', newUsername);
      },
      error: function(model, response) {
        throw new Error('FAILED TO SIGN UP');
      },
    });
  },
  logout: function(query, range){
    this.clear();
    console.log('logout on session');
    this.save(null,
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/_logout`,
        success: (model, response) => {
          model.clear();
          localStorage.clear();

          this.set('query', query);
          this.set('range', range);

          this.trigger('change');
          console.log('USER LOGGED OUT!');
      },
       error: function(model, response) {
         throw new Error('LOGOUT FAILED');
      },
    });
  },
  retrieve: function() {
    this.fetch({
      url: `https://baas.kinvey.com/user/kid_SkBnla5Y/_me`,
      success: (model, response) => {
          this.trigger('change');
          // console.log('USER RETRIEVED: this ', this);
      },
      error: function(response) {
        throw new Error('COULD NOT FETCH USER!');
      },
    });
  },
});

export default SessionModel;
