import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';

import router from './router';
import store from './store';

//ask jess
/*
  1. Location before login
  2. PUT request to users
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
  // console.log(store.session.apiGeoLocation());

} else {
  store.session.retrieve();
  // console.log(store.session.apiGeoLocation());
}
store.session.apiGeoLocation();



ReactDOM.render(router, document.getElementById('container'));
