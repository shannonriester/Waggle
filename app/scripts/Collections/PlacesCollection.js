import Backbone from 'backbone';
import $ from 'jQuery';

import PlaceModel from '../Models/PlaceModel';

const PlacesCollection = Backbone.Collection.extend({
  model: PlaceModel,
  url: `https://api.foursquare.com/v2/venues/search/`,
  getResults: function(){
    $.ajax({
      type: 'GET',
      url: `https://api.foursquare.com/v2/venues/search/`,
      data: {
        client_id: 'H5L4YMYV2UTAUOA0YXXQM1WIXVLJGH45LGO0VM31PPAYMNHW',
        client_secret: 'DUB0OMKZF5VBINPV5YUZSVGXE1BI12GIHBVIUHYI4XON4DY0',
        v: '20130815',
        near: 'Austin,TX',
        query: 'dog_run',
        similar: 'dog_friendly',
      },
      success: (data) => {
        console.log(data);
      },
    });
  },

});

export default PlacesCollection;
