import Backbone from 'backbone';
import $ from 'jquery';

const SessionModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/user/kid_SkBnla5Y/`,
  defaults: {
    username: '',
    isEditing: false,
    recentPlaces: [{},],
    profile: {
      usersName: '',
      profilePic: {},
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
    coordinates: [],
    city: '',
    zipcode: '',
    regionCode: '',
    regionName: '',
    ip: '',
    country: '',
  },
  updateUser: function() {
    this.save(null,
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
        type: 'PUT',
        success: (model, response) => {
        // console.log('UPDATED USER ', response);
      }, error: (e) => {
          console.log('SESSION.UPDATEUSER ERROR: ', e);
      }
    });
  },
  updateProfile: function(profilePic, userName, userAge, dogName, dogAge, dogBreed, aboutInfo) {
    this.set('isEditing', false);
    this.save(
      {profile: {profilePic:profilePic, usersName:userName, usersAge:userAge, bio:aboutInfo, images:this.get('profile').images},
      dog:{dogName:dogName, breed:dogBreed, dogAge:dogAge}},
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
        type: 'PUT',
        success: (model, response) => {
        // console.log('USER UPDATED PROFILE ', response);
        this.trigger('change');

      }, error: (e) => {
          console.log('updateProfile ERROR: ', e);
      }
    });
  },
  // getLocation: function() {
  //     var promise = new Promise((resolve, reject) => {
  //       if ('geolocation' in navigator) {
  //         window.navigator.geolocation.getCurrentPosition((position) => {
  //           // console.log('position ', position);
  //           this.set('coordinates',[position.coords.latitude,position.coords.longitude]);
  //           resolve (position);
  //         });
  //       } else {
  //           reject('This browser doesn\'t support geolocation...');
  //       }
  //     });
  //   return promise;
  // },
  apiGeoLocation: function() {
    return $.ajax({
      type: 'GET',
      url: `https://freegeoip.net/json/`,
      success: (response) => {
        // console.log('location reponse', response);
        let coordinates = [response.latitude, response.longitude]
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
          this.updateUser();
          // console.log('session in the geoLocation ', this);
        }
        // this.updateUser();
      },
      error: (e) => {
        console.log('apiGeoLocation ERROR: ', e);
      }
    });
  },
  parse: function(response) {
    if (response) {
      // console.log(response);
      return {
        username: response.username,
        userId: response._id,
        authtoken: response._kmd.authtoken,
        profile: response.profile,
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
  signup: function(username, password) {
    let newUsername = username.toLowerCase();
    this.save({
      username: newUsername,
      password: password,
    },
    {
      url: `https://baas.kinvey.com/user/kid_SkBnla5Y/`,
      success: (model, response) => {
        localStorage.removeItem('authtoken');
        localStorage.setItem('authtoken', response._kmd.authtoken);
        this.unset('password');
        // this.unset('auth');
        this.trigger('change update');

        console.log('USER SIGNED UP!', newUsername);
      },
      error: function(model, response) {
        throw new Error('FAILED TO SIGN UP');
      },
    });
  },
  logout: function(query){
    this.save(null,
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/_logout`,
        success: (model, response) => {
          model.clear();
          // localStorage.removeItem('authtoken');
          localStorage.clear();
          // console.log(localStorage.au);
          this.set('query', query);
          this.trigger('change');

          console.log('USER LOGGED OUT!');
      },
       error: function(model, response) {
         throw new Error('LOGIN FAILED');
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
