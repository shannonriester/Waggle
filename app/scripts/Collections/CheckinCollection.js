import Backbone from 'backbone';
import $ from 'jQuery';
import moment from 'moment';

import CheckinModel from '../Models/CheckinModel';

export default Backbone.Collection.extend({
  model: CheckinModel,
  url: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/CheckinCollection`,
  toggleCheckin: function(session, userModel, placeId, checkout) {
    let username = session.get('username');
    let alreadyCheckedin = this.where({userCheckedin: username, place: placeId});

    if (!alreadyCheckedin[0]) {
      this.create(
        {place: placeId, userCheckedin: username},
        {success: (model, response) => {
          // let oldPlaces = session.get('recentPlaces');
          // session.set('recentPlaces', oldPlaces.concat(model.toJSON()));
          // userModel.set('recentPlaces', oldPlaces.concat(model.toJSON()));

        }, error: function(model, response) {
          throw new Error('FAILED TO CHECKIN');
        }
      });
    } else {
      let checkedinModel = this.get(alreadyCheckedin[0].attributes._id)
      checkedinModel.destroy();
    }
  },
  deleteOldCheckins: function() {
    this.models.forEach((model) => {
      model = model.toJSON();

      let maxTime = moment(model._kmd.ect).add(24, 'hours').unix();

      let timeNow = new Date();
      timeNow = moment(timeNow).unix();

      if (maxTime <= timeNow) {
        let oldModel = this.get(model._id);
        // oldModel.destroy();
        console.log('WOULD HAVE DESTROYED ' + model._id + 'BECAUSE IT\'S BEEN TOO LONG THEY ARE CHECKED IN');
      } else {
        let stillGoodModel = this.get(model._id);
      }

    });
  },
});
