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
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`);
    } else {
      browserHistory.push('/');
      xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
    }
  }
});

if (localStorage.authtoken) {
  store.session.retrieve();
}



ReactDOM.render(router, document.getElementById('container'));
