import Backbone from 'backbone';

const PlaceModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    checkedinUsers: [],
  },
  infoBox: false,
});

export default PlaceModel;
