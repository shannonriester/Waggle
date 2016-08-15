import React from 'react';
import ReactDOM from 'react-dom';
import { browswerHistory } from 'react-router';
import $ from 'jquery';

import router from './router';
import store from './store';

//ask jess
/*
  1. Mobile login
  2. Mobile views? React Native?
    - How do this with web app also?
  3. Yelp me with yelp's location
    - Have LL but the search doesn't work unless it's the city...
    /search?term=dog%20park
  4. Zombie? from LandingPage --> ResultsPage
  5. Refresh -- lose results page...
*/




$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('foursquare') === -1) {
    if (localStorage.getItem('authtoken')) {
      // console.log('kinvey auth');
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`);
    } else {
      // console.log('basic auth');
      xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
    }
  }
});



ReactDOM.render(router, document.getElementById('container'));
