import Backbone from 'backbone';
import $ from 'jQuery';
import OAuth from '../OAuth';

import PlaceModel from '../Models/PlaceModel';

const PlacesCollection = Backbone.Collection.extend({
  model: PlaceModel,
  url: `https://api.foursquare.com/v2/venues/search/`,
  getResults: function(location, query){
    let auth = {
      consumerKey : "VNBVIZYVwtO4IZKuRQ4Jeg",
      consumerSecret : "Ka94kOBVXrxnZqQHxUU-P5KASvM",
      accessToken : "03rzdIzPRqHNjl6h6Qyui8fv2cmLc8ul",
      accessTokenSecret : "Vh7sHRdk_xDjioNtwrPsNUPHnwA",
      serviceProvider : {
          signatureMethod : "HMAC-SHA1",
      }
    }
    let latitude = location[0];
    let longituge = location[1];
    let cll = (latitude + ',' + longituge);

    let terms = 'dogs allowed, ' + query;
    let near = 'Austin';
    let sort = 2;
    // let radiusFilter = ;

    let accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret,
    };

    let parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['sort', sort]);
    parameters.push(['location', near]);
    // parameters.push(['radius_filter', radiusFilter]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    let message = {
        'action' : 'https://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters,
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    let parameterMap = OAuth.getParameterMap(message.parameters);

    $.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'cb',
        'cache': true,
    })
    .then((places) => {
      console.log('YELP DATA: ', places);
      places.businesses.forEach((place) => {
          this.add({
            name: place.name,
            yelpRating: place.rating,
            yelpRatingStars: place.rating_img_url,
            yelpMobileUrl: place.mobile_url,
            yelpID: place.id,
            categories: place.categories,
            imageUrl: place.image_url,
            snippetImageUrl: place.snippet_image_url,
            snippetText: place.snippet_text,
            ll: place.location.coordinate,
            address: place.location.display_address,
            neighborhoods: place.location.neighborhoods,
            isClosed: place.is_closed,
            reviewCount: place.review_count,
          });
      });

    })
    .fail(function(e) {
      console.error('FAILED TO GET YELP DATA: ', e)
    });

    // $.ajax({
    //   type: 'GET',
    //   url: `https://api.foursquare.com/v2/venues/search/`,
    //   data: {
    //     client_id: 'H5L4YMYV2UTAUOA0YXXQM1WIXVLJGH45LGO0VM31PPAYMNHW',
    //     client_secret: 'DUB0OMKZF5VBINPV5YUZSVGXE1BI12GIHBVIUHYI4XON4DY0',
    //     v: '20130815',
    //     // near: 'Austin,TX',
    //     ll: ll,
    //     query: q,
    //     similar: '4bf58dd8d48988d1e5941735',
    //   },
    //   success: (categoryResults) => {
    //     let venueResults = categoryResults.response.venues.forEach((venue, i, arr) => {
    //       let venueID = venue.id;
    //         $.ajax({
    //           type: 'GET',
    //           url: `https://api.foursquare.com/v2/venues/${venueID}/photos/`,
    //           data: {
    //             client_id: 'H5L4YMYV2UTAUOA0YXXQM1WIXVLJGH45LGO0VM31PPAYMNHW',
    //             client_secret: 'DUB0OMKZF5VBINPV5YUZSVGXE1BI12GIHBVIUHYI4XON4DY0',
    //             v: '20130815',
    //             near: 'Austin,TX',
    //             query: 'dog_park',
    //             similar: '4bf58dd8d48988d1e5941735',
    //           },
    //           success: (venue) => {
    //             if (venue.response.photos.items.length > 0) {
    //               let imageURL = venue.response.photos.items.map((item) => {
    //                 let prefix = item.prefix;
    //                 let suffix = item.suffix;
    //                 let image = prefix + 'original' + suffix;
    //                 return image;
    //               });
    //
    //                 // console.log(categoryResults.response.venues[i]);
    //                 let newVenue = categoryResults.response.venues[i];
    //                 this.add({
    //                   // categoryID: newVenue.id,
    //                   venueName: newVenue.name,
    //                   venueID: newVenue.id,
    //                   location: newVenue.location,
    //                   zip: newVenue.location.postalCode,
    //                   state: newVenue.location.state,
    //                   image: imageURL,
    //                 });
    //                 this.trigger('update')
    //
    //             }
    //
    //           },
    //           error: function(model, response) {
    //             throw new Error('FAILED TO SEARCH FIND VENUE IMAGES');
    //           },
    //
    //       });
    //     });
    //
    //   },
    //   error: function(model, response) {
    //     throw new Error('FAILED TO SEARCH VENUES');
    //   },
    //
    // });

  },

});

export default PlacesCollection;
