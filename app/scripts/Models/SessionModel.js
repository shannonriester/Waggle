import Backbone from 'backbone';
import $ from 'jquery';

const SessionModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/user/kid_SkBnla5Y/login`,
  defaults: {
    username: '',
    profile: {
      name: '',
      images: [],
      age: 28,
      bio: '',
      recentPlaces: [{},],
    },
    dog: {
      name: '',
      breed: '',
      age: '',
    },
    query: 'park',
    location: {
      coordinates:[0,0],
      city: '',
      zipcode: 0,
      regionCode: '',
      regionName: '',
      ip: '',
      country: '',
    },

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
    $.ajax({
      type: 'GET',
      url: `https://freegeoip.net/json/`,
      success: (response) => {
        // console.log(response);
        let coordinates = [response.latitude, response.longitude]
        this.set('coordinates', coordinates);
        this.set('city', response.city);
        this.set('zipcode', response.zip_code);
        this.set('regionCode', response.regionCode);
        this.set('regionName', response.regionName);
        this.set('country', response.country_name);
        console.log(this);
      },
      error: (e) => {
        console.log('error: ', e);
      }
    });

  },
  parse: function(response) {
    if (response) {
      return {
        username: response.username,
        response: response._Id,
        authtoken: response._kmd.authtoken
      };
    }
  },
  login: function(username, password) {
    let newUsername = username.toLowerCase();
    this.save(
      { username: newUsername, password: password},
      { success: (model, response) => {
          console.log('USER SIGNED IN', newUsername);
          // localStorage.removeItem('authtoken');
          localStorage.setItem('authtoken', response._kmd.authtoken);
          this.apiGeoLocation();
          // this.getLocation().then(() => {
          //   console.log(location);
          //   // this.set('location')
          // });

          this.unset('password');
          this.trigger('change update');
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
        console.log('USER SIGNED UP!', newUsername);
        localStorage.setItem('authtoken', response._kmd.authtoken);

        this.getLocation().then(() => {
          console.log(location);
          this.set('location', this)
        });

        this.unset('password');
        this.trigger('change update');
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
          console.log('USER LOGGED OUT!');
          localStorage.removeItem('authtoken');
          sessionStorage.removeItem('searchTerm');
          model.reset();
          this.set('query', 'park');
          this.trigger('change update');
          console.log(this);
      },
       error: function(model, response) {
         throw new Error('LOGIN FAILED');
      },
    });
  },
  retrieve: function() {
    this.fetch({
      url: `https://baas.kinvey.com/user/kid_SkBnla5Y/_me`,
      success: () => {
          console.log('User Retrieved: ', this);
      },
      error: function(response) {
        throw new Error('COULD NOT FETCH USER!')
      },
    });
  },
});

export default SessionModel;
