import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import router from './router';



$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('foursquare') === -1) {
    if (localStorage.authtoken) {
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`);
    } else {
      xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
    }
  }
});

ReactDOM.render(router, document.getElementById('container'));
