import React from 'react';

import store from '../store';

export default React.createClass({
  searchHandler: function() {
    let query = this.refs.searchbar.value;
    console.log(query);
    // store.placesCollection.getResults(query);
  },
  render: function() {
    return (
      <form className="searchbar-component" onSubmit={this.searchHandler}>
        <input className="searchbar" type="text" placeholder="dog parks" ref="searchbar" role="textbox" tabIndex="1"/>
        <input className="search-btn" type="button" value="search" role="button" tabIndex="2" />
      </form>
      );
    }
});
