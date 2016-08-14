import Backbone from 'backbone';
import $ from 'jQuery';
import nonce from 'nonce';

import PlaceModel from '../Models/PlaceModel';

const PlacesCollection = Backbone.Collection.extend({
  model: PlaceModel,
  url: `https://api.foursquare.com/v2/venues/search/`,
  getResults: function(location, query){
 //`https://api.foursquare.com/v2/venues/search/?near=Austin,TX&client_id=H5L4YMYV2UTAUOA0YXXQM1WIXVLJGH45LGO0VM31PPAYMNHW&client_secret=DUB0OMKZF5VBINPV5YUZSVGXE1BI12GIHBVIUHYI4XON4DY0&v=20130815`
    // categorySimilarIDs: {'hike and bike trails':'4bf58dd8d48988d159941735', 'dog runs':'4bf58dd8d48988d1e5941735', }

    let latitude = location[0];
    let longituge = location[1];
    let ll = (latitude + ',' + longituge);
    let q = query + ', dog_runs';
    
    $.ajax({
      type: 'GET',
      url: `https://api.foursquare.com/v2/venues/search/`,
      data: {
        client_id: 'H5L4YMYV2UTAUOA0YXXQM1WIXVLJGH45LGO0VM31PPAYMNHW',
        client_secret: 'DUB0OMKZF5VBINPV5YUZSVGXE1BI12GIHBVIUHYI4XON4DY0',
        v: '20130815',
        // near: 'Austin,TX',
        ll: ll,
        query: q,
        similar: '4bf58dd8d48988d1e5941735',
      },
      success: (categoryResults) => {
        let venueResults = categoryResults.response.venues.forEach((venue, i, arr) => {
          let venueID = venue.id;
            $.ajax({
              type: 'GET',
              url: `https://api.foursquare.com/v2/venues/${venueID}/photos/`,
              data: {
                client_id: 'H5L4YMYV2UTAUOA0YXXQM1WIXVLJGH45LGO0VM31PPAYMNHW',
                client_secret: 'DUB0OMKZF5VBINPV5YUZSVGXE1BI12GIHBVIUHYI4XON4DY0',
                v: '20130815',
                near: 'Austin,TX',
                query: 'dog_park',
                similar: '4bf58dd8d48988d1e5941735',
              },
              success: (venue) => {
                if (venue.response.photos.items.length > 0) {
                  let imageURL = venue.response.photos.items.map((item) => {
                    let prefix = item.prefix;
                    let suffix = item.suffix;
                    let image = prefix + 'original' + suffix;
                    return image;
                  });

                    console.log(categoryResults.response.venues[i]);
                    let newVenue = categoryResults.response.venues[i];
                    this.add({
                      categoryID: newVenue.categories[0].id,
                      categoryName: newVenue.categories[0].name,
                      venueID: newVenue.id,
                      location: newVenue.location,
                      zip: newVenue.location.postalCode,
                      state: newVenue.location.state,
                      image: imageURL,
                    });

                }

              },
              error: function(model, response) {
                throw new Error('FAILED TO SEARCH FIND VENUE IMAGES');
              },

          });
        });

      },
      error: function(model, response) {
        throw new Error('FAILED TO SEARCH VENUES');
      },

    });

  },

});

export default PlacesCollection;
