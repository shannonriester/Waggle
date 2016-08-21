import Backbone from 'backbone';
import moment from 'moment';

const MatchModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/appdata/kid_SkBnla5Y/MatchCollection`,
  defaults: {
      timestamp: new Date(),
      sender: '',
      likee: '',
  },
});

export default MatchModel;
