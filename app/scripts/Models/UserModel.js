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
      profilePic: '/assets/default_dog_large.png',
      images: ['/assets/default_dog_large.png',],
      usersAge: '',
      bio: '',
    },
    dog: {
      dogName: 'name',
      dogBreed: 'breed',
      dogAge: 'age',
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
  convertImgFile: function(file) {
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
      this.convertImgFile(file).then(() => {
        let profile = this.get('profile');
        profile.profilePic = response._downloadURL;
        this.set('profile', profile);

        this.save(null, {
          type: 'PUT',
          url: `https://baas.kinvey.com/user/kid_SkBnla5Y/${this.get('userId')}`,
          success: (response) => {
            console.log(response);
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
          this.trigger('change update');
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
                console.log(response);
              }
            });
          }

        })

    });
  },
});

export default UserModel;
