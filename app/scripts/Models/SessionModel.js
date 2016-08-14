import Backbone from 'backbone';

const SessionModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/user/kid_SkBnla5Y/login`,
  defaults: {
    username: '',
    location: [0,0],
    query: 'dog park',
  },
  getLocation: function() {
      var promise = new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
          window.navigator.geolocation.getCurrentPosition((position) => {
            // console.log('position ', position);
            this.set('location',[position.coords.latitude,position.coords.longitude]);
            resolve (position);
          });
        } else {
            reject('This browser doesn\'t support geolocation...');
        }
      });

    return promise;
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
    this.save(
      { username: username, password: password},
      { success: (model, response) => {
          console.log('USER SIGNED IN', username);
          // localStorage.removeItem('authtoken');
          localStorage.setItem('authtoken', response._kmd.authtoken);
          this.unset('password');
          this.trigger('change update');
      },
       error: function(model, response) {
         throw new Error('LOGIN FAILED');
      },
    });
  },
  signup: function(username, password) {
    this.save({
      username: username,
      password: password,
    },
    {
      url: `https://baas.kinvey.com/user/kid_SkBnla5Y/`,
      success: (model, response) => {
        localStorage.removeItem('authtoken');
        console.log('USER SIGNED UP!', username);
        localStorage.setItem('authtoken', response._kmd.authtoken);
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
          this.clear();
          this.trigger('change update');
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
