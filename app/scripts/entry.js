import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from 'google-map-react';
import { browserHistory } from 'react-router';
import $ from 'jquery';

import router from './router';
import store from './store';

store.session.apiGeoLocation();


$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('kinvey') !== -1 && jqueryAjax.url.indexOf('blob') === -1) {
    if (localStorage.getItem('authtoken')) {
      console.log('kinveyAuth', jqueryAjax.url);
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`);
    } else {
      console.log('basicAuth', jqueryAjax.url);
      browserHistory.push('/');
      xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
    }
  }
});

if (localStorage.authtoken) {
  store.session.retrieve();
}



ReactDOM.render(router, document.getElementById('container'));
