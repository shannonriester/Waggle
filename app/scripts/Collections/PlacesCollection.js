import Backbone from 'backbone';
import $ from 'jQuery';
import OAuth from '../OAuth';

import PlaceModel from '../Models/PlaceModel';

const PlacesCollection = Backbone.Collection.extend({
  model: PlaceModel,
  url: `https://api.foursquare.com/v2/venues/search/`,
  getResults: function(city, coordinates, query){
    console.log(city);
    this.reset();
    let auth = {
      consumerKey : "VNBVIZYVwtO4IZKuRQ4Jeg",
      consumerSecret : "Ka94kOBVXrxnZqQHxUU-P5KASvM",
      accessToken : "03rzdIzPRqHNjl6h6Qyui8fv2cmLc8ul",
      accessTokenSecret : "Vh7sHRdk_xDjioNtwrPsNUPHnwA",
      serviceProvider : {
          signatureMethod : "HMAC-SHA1",
      },
    };

    // let latitude = location[0];
    // let longituge = location[1];
    // let cll = (latitude + ',' + longituge);

    let terms = 'dogs allowed, ' + query;
    let near = city;
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
    let addedWhatevs =  places.businesses.forEach((place) => {
        // console.log(place);
        // return {}
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

      // this.add(addedWhatevs)

    })
    .fail(function(e) {
      console.error('FAILED TO GET YELP DATA: ', e)
    });

  },
  getYelpResult: function(yelpID) {
    this.reset();
    let auth = {
      consumerKey : "VNBVIZYVwtO4IZKuRQ4Jeg",
      consumerSecret : "Ka94kOBVXrxnZqQHxUU-P5KASvM",
      accessToken : "03rzdIzPRqHNjl6h6Qyui8fv2cmLc8ul",
      accessTokenSecret : "Vh7sHRdk_xDjioNtwrPsNUPHnwA",
      serviceProvider : {
          signatureMethod : "HMAC-SHA1",
      },
    };

    let latitude = location[0];
    let longituge = location[1];
    let cll = (latitude + ',' + longituge);

    // let terms = 'dogs allowed, ' + query;
    let near = 'Austin';
    // let sort = 2;
    // let radiusFilter = ;

    let accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret,
    };

    let parameters = [];
    // parameters.push(['term', terms]);
    // parameters.push(['sort', sort]);
    parameters.push(['location', near]);
    // parameters.push(['radius_filter', radiusFilter]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    let message = {
        'action' : `https://api.yelp.com/v2/business/${yelpID}`,
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
        // 'jsonp': 'cb',
        'jsonpCallback' : 'cb',
        'cache': true,
    })
    .then((place) => {
      // console.log('YELP DATA: ', place);
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

    })
    .fail(function(e) {
      console.error('FAILED TO GET YELP DATA: ', e)
    });
  },

});

export default PlacesCollection;
