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

    //ect entity creation time _kmd.ect on kinvey response
      //use this to find when they checked in
      //run a query on the ect date/time so that if it's been x-number of hours/days, DESTROY this model from the collection

      //var aweekago = new Date()
      // aweekago.getDate()
      //aweekago.setDate(aweekago.getDate() -7)
        //compare Date objects any time you manipulate a date, you need to make a new date

    // console.log(username);
    // console.log(placeId);
    // session.set({'checkedin', true});
    this.create(
      {place:placeId, userCheckedin: username},
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
