import Backbone from 'backbone';
import moment from 'moment';

const CheckinModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/CheckinCollection`,
  defaults: {
    place: '',
    usersCheckedin: [],
    time: new Date(),
    formatTime: moment().format('MMMM Do YYY, h:mm:ss a'),
    shortTime: moment().format('MM Do, h:mm:ss a'),
  },
});

export default CheckinModel;
