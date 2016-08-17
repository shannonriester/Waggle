import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';

import router from './router';
import store from './store';

//ask jess
/*
  1. Mobile views?
    - why not working in mobile but working on "mobile" on web...?
  2. Yelp me with yelp's location
    - Have LL but the search doesn't work unless it's the city...
  3. PlaceItemPage with toJSON()
*/




$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('freegeoip') === -1) {
    if (localStorage.getItem('authtoken')) {
      // console.log('kinvey auth');
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`);
    } else {
      // console.log('basic auth');
      xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
    }
  }
});

if (!localStorage.authtoken) {
  browserHistory.push('/');
  // store.session.apiGeoLocation();
  // console.log(store.session.apiGeoLocation());

} else {
  store.session.retrieve();
  // store.session.apiGeoLocation();
  // console.log(store.session.apiGeoLocation());
}



ReactDOM.render(router, document.getElementById('container'));
