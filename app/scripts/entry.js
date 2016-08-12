import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import router from './router';
import store from './store';



$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('foursquare') === -1) {
    if (localStorage.getItem('authtoken')) {
      console.log('kinvey auth');
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`);
    } else {
      console.log('basic auth');
      xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
    }
  }
});

if (localStorage.authtoken) {
  store.session.retrieve();
  // browswerHistory.push('/');
}

ReactDOM.render(router, document.getElementById('container'));
