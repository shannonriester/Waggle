import Backbone from 'backbone';

const SessionModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/user/kid_SkBnla5Y/login`,
  defaults: {
    username: '',

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
        // localStorage.authtoken = response._kmd.authtoken;
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
          // this.set('isLoggingIn', false);
          // this.set('isSigningUp', false);
          localStorage.removeItem('authtoken');
          // localStorage.authtoken = 'afe43b20-9499-48f1-a1f7-7ffa9d8b99d4.dDsyxSzL3cOFa0ctR35XC5yHVsCN2Sh5551M/a+SibQ=';
          // sessionStorage.removeItem('searchTerm');
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
