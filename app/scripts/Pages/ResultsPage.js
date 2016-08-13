import React from 'react';

import store from '../store';

export default React.createClass({
  render: function() {
    console.log(store.placesCollection.getResults());

    return (
      <div className="results-page-component">On the Results page
      </div>
    );
  }
});
