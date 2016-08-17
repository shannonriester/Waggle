import Backbone from 'backbone';

const PlaceModel = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    checkedinUsers: [],
  },
});

export default PlaceModel;
