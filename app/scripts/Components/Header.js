import React from 'react';

import Nav from './Nav';
import store from '../store';
// import Searchbar from './Searchbar';

export default React.createClass({
  getInitialState: function() {
    return {
      users: store.userCollection.toJSON(),
    }
  },
  updateState: function() {
    this.setState({users: store.userCollection.toJSON()});
  },
  componentDidMount: function() {
    store.userCollection.fetch();
    store.userCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.userCollection.off('change update', this.updateState);
  },
  render: function() {
      return (
        <header className="header-component">
          <Nav />
        </header>
    );
  }
});
