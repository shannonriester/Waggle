import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Header from '../Components/Header';

export default React.createClass({
  getInitialState: function() {
    return {null}
  },
  componentWillMount: function() {
    if (!localStorage.authtoken) {
      browserHistory.push('/');
    }

    store.session.on('change', this.updateState);
    store.session.getLocation().then((position) => {
      console.log(position);
    });
  },
  componentDidMount: function () {

  },
  componentWillUnmount: function() {
    // store.placesCollection.get(this.props.venue._id).off('change', this.updateState);
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
