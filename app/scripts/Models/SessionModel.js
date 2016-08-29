import { browserHistory } from 'react-router';
import Backbone from 'backbone';
import $ from 'jquery';

const SessionModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/user/kid_SkBnla5Y`,
  defaults: {
    username: '',
    editProfile: false,
    editingDog: false,
    editingSelf: false,
    recentPlaces: [{},],
    profile: {
      profilePic: '/assets/default_dog_large.png',
      bkgrndImgs: [
        '/assets/profileImgs/dog6.jpeg',
        '/assets/profileImgs/dog5.jpeg',
        '/assets/profileImgs/dog3.jpeg',
        '/assets/profileImgs/dog4.jpeg',
        '/assets/profileImgs/dog1.jpeg'
      ],
      usersAge: '',
      bio: '',
    },
    dog: {
      dogName: 'name',
      dogBreed: 'breed',
      dogAge: 'age',
    },
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
    changedCity: false,
    newCoordinates: [],
  },
  updateUser: function() {
    this.save(null,
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
        type: 'PUT',
        success: (model, response) => {
          this.trigger('change');
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
        this.trigger('change');
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
        this.trigger('change');
      }, error: (e) => {
          console.log('UPDATE USER INFO ERROR: ', e);
      }
    });
  },
  convertImgFile: function(file) {
    console.log(file);
    let fileId;
    return new Promise((resolve, reject) => {
      this.postToKinveyFile(file)
        .then((kinveyFile) => {
          fileId = kinveyFile._id;
          this.putToGoogle(file, kinveyFile)
            .then(() => {
              this.getPicFromKinvey(fileId)
                .then((downloadURL) => {
                  resolve(downloadURL);
                })

            })
        })
    })
  },
  postToKinveyFile: function(file) {
      return $.ajax({
      url: 'https://baas.kinvey.com/blob/kid_SkBnla5Y',
      type: 'POST',
      headers: {
        Authorization: 'Kinvey ' + localStorage.authtoken,
        "X-Kinvey-Content-Type": file.type,
      },
      contentType: 'application/json',
      data: JSON.stringify({
        _public: true,
        mimeType: file.type,
      })
    });
  },
  putToGoogle: function(file, kinveyFile){
    return $.ajax({
      url: kinveyFile._uploadURL,
      headers: kinveyFile._requiredHeaders,
      data: file,
      contentLength: file.size,
      type: 'PUT',
      processData: false,
      contentType: false,
    })
  },
  getPicFromKinvey: function(fileId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://baas.kinvey.com/blob/kid_SkBnla5Y/${fileId}`,
        headers: {
          Authorization: 'Kinvey ' + localStorage.authtoken,
        },
      })
      .then((response) => {
        resolve(response._downloadURL);
      })
      .fail((e) => {
        console.error(e);
      })
    });
  },
  updateProfile: function(file, bio) {
    this.set('editProfile', false);
    let currProfile = this.get('profile');
    currProfile.bio = bio;
    this.set('profile', currProfile)

    if (file) {
      this.convertImgFile(file).then((downloadURL) => {
        let profile = this.get('profile');
        profile.profilePic = downloadURL;
        this.set('profile', profile);

        this.save(null, {
          type: 'PUT',
          url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
          success: (response) => {
            // console.log(response);
          }
        });
      })
    } else {
      this.save(
        { profile: currProfile},
        { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
          type: 'PUT',
          success: (model, response) => {
          // console.log('USER UPDATED PROFILE ', response);
          this.trigger('change');
        }, error: (e) => {
            console.log('updateProfile ERROR: ', e);
        }
      });
    }
  },
  updateBkgrndImgs: function(bkgrndImgs, bio) {
    this.set('isEditing', false);

    let profile = this.get('profile');
    profile.bkgrndImgs = [];
    this.set('profile', profile);

    bkgrndImgs.forEach((img, i) => {
      this.convertImgFile(img)
        .then((downloadURL) => {
          profile.bkgrndImgs.push(downloadURL);
          this.set('profile', profile);
          if (profile.bkgrndImgs.length === bkgrndImgs.length) {
            this.save(null, {
              type: 'PUT',
              url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
              success: (response) => {
                // console.log(response);
              }
            });
          }

        })

    });
  },
  apiGeoLocation: function() {
    return $.ajax({
      type: 'GET',
      url: `https://freegeoip.net/json/`,
      success: (response) => {
        let coordinates = [response.latitude, response.longitude];
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
        coordinates: response.coordinates,
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
        type: 'POST',
        success: (model, response) => {
          localStorage.setItem('authtoken', response._kmd.authtoken);
          browserHistory.push({ pathname:`/search/`, query:{category: this.get('query')} });

          this.unset('password');
          this.trigger('change');
          // console.log('USER SIGNED IN', newUsername);
      },
       error: function(model, response) {
         throw new Error('LOGIN FAILED');
      },
    });
  },
  signup: function(username, password, email, firstName, lastName, age, dogName, dogAge, dogBreed) {
    let newUsername = username.toLowerCase();
    this.save({
      username: newUsername,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      age: age,
      dogName: dogName,
      dogAge: dogAge,
      dogBreed: dogBreed,
    },{
      url: `https://baas.kinvey.com/user/kid_SkBnla5Y/`,
      type: 'POST',
      success: (model, response) => {
        localStorage.removeItem('authtoken');
        localStorage.setItem('authtoken', response._kmd.authtoken);
        this.unset('password');
        browserHistory.push({ pathname:`/search/`, query:{category: this.get('query')} });

        this.trigger('change');
        // console.log('USER SIGNED UP!', newUsername);
      },
      error: function(model, response) {
        throw new Error('FAILED TO SIGN UP');
      },
    });
  },
  logout: function(query, range){
    this.save(null,
      { url: `https://baas.kinvey.com/user/kid_SkBnla5Y/_logout`,
        type: 'POST',
        success: (model, response) => {
          localStorage.clear();
          browserHistory.push('/');

          this.unset('authtoken');

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
          // this.trigger('change');
          // console.log('USER RETRIEVED: this ', this.toJSON());
      },
      error: function(response) {
        throw new Error('COULD NOT FETCH USER!');
      },
    });
  },
});

export default SessionModel;
