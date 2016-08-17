import Backbone from 'backbone';
import $ from 'jQuery';

import CheckinModel from '../Models/CheckinModel';

export default Backbone.Collection.extend({
  model: CheckinModel,
  url: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/CheckinCollection`,
  toggleCheckin: function(username, placeId) {
    // console.log(this.models[0]);
    // let placetest = this.models.filter((place, i, arr) => {
    //   console.log(place);
    //   return checkedinUser
    // });
    // console.log(placetest);

    // console.log(username);
    // console.log(placeId);
    let usersCheckedin = [username];
    // session.set({'checkedin', true});
    this.create(
      {place:placeId, usersCheckedin: usersCheckedin},
      {success: (model, response) => {
        console.log('YOU CHECKED IN!');
        console.log('model', model);
        console.log('response', response);
      }, error: function(model, response) {
        throw new Error('FAILED TO VOTE');
      }
    });
  },
});
