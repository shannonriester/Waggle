import Backbone from 'backbone';
import $ from 'jQuery';

import CheckinModel from '../Models/CheckinModel';

export default Backbone.Collection.extend({
  model: CheckinModel,
  url: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/CheckinCollection`,
  checkinUser: function(username) {

  },
});
