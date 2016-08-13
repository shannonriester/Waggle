import React from 'react';

import store from '../store';
import Header from '../Components/Header';

export default React.createClass({
  getInitialState: function() {
    return {null}
  },
  componentDidMount: function () {
    store.session.on('change', this.updateState);
    store.session.getLocation().then((position) => {
      console.log(position);
    });
  },
  componentWillUnmount: function() {
    // this.s
  },
  render: function() {
    // console.log(store.placesCollection.getResults());

    return (
      <div className="results-page-component">
        <Header/>

      </div>
    );
  }
});
