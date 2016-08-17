import Backbone from 'backbone';
import $ from 'jquery';

const SessionModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/user/kid_SkBnla5Y/login`,
  defaults: {
    username: '',
    isEditing: false,
    profile: {
      usersName: '',
      images: [],
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
    location: {
      checkedin: false,
      coordinates:[0,0],
      city: '',
      zipcode: '',
      regionCode: '',
      regionName: '',
      ip: '',
      country: '',
    },
  },
  updateProfile: function(userName, userAge, dogName, dogAge, dogBreed, aboutInfo) {
    this.set('isEditing', false);
    this.save(
      {profile: {usersName:userName, usersAge:userAge, bio:aboutInfo},
      dog:{dogName:dogName, breed:dogBreed, dogAge:dogAge}},
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
        type: 'PUT',
        success: (model, response) => {
        console.log('USER UPDATED PROFILE ', response);
      }, error: (e) => {
          console.log('updateProfile ERROR: ', e);
      }
    });
  },
  getLocation: function() {
      var promise = new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
          window.navigator.geolocation.getCurrentPosition((position) => {
            // console.log('position ', position);
            this.set('coordinates',[position.coords.latitude,position.coords.longitude]);
            resolve (position);
          });
        } else {
            reject('This browser doesn\'t support geolocation...');
        }
      });
    return promise;
  },
  apiGeoLocation: function() {
    return $.ajax({
      type: 'GET',
      url: `https://freegeoip.net/json/`,
      success: (response) => {
        console.log('response', response);
        let coordinates = [response.latitude, response.longitude]
        this.set({
          coordinates,
          city: response.city,
          zipcode: response.zip_code,
          'regionCode': response.regionCode,
          'regionName': response.regionName,
          'country': response.country_name,
        });
        console.log('this in the sessionModel ', this);
      },
      error: (e) => {
        console.log('apiGeoLocation ERROR: ', e);
      }
    });
  },
  parse: function(response) {
    if (response) {
      return {
        username: response.username,
        userId: response._id,
        authtoken: response._kmd.authtoken,
        profile: response.profile,
        dog: response.dog,
        location: response.location,
      };
    }
  },
  login: function(username, password) {
    let newUsername = username.toLowerCase();
    this.save(
      { username: newUsername, password: password},
      { success: (model, response) => {
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
        this.trigger('change update');

        console.log('USER SIGNED UP!', newUsername);
      },
      error: function(model, response) {
        throw new Error('FAILED TO SIGN UP');
      },
    });
  },
  logout: function(){
    this.save(null,
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/_logout`,
        success: (model, response) => {
          model.clear();
          localStorage.removeItem('authtoken');
          this.set('query', 'park');
          this.trigger('change update');
          browserHistory.push('/');

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

          console.log('USER RETRIEVED: this ', this);
      },
      error: function(response) {
        throw new Error('COULD NOT FETCH USER!');
      },
    });
  },
});

export default SessionModel;
