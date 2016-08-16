import Backbone from 'backbone';

const CheckinModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/CheckinCollection`,
  defaults: {},
});

export default CheckinModel;
