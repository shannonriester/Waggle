import React from 'react';

import store from '../store';

export default React.createClass({
  searchHandler: function(e) {
    e.preventDefault();
    let query = this.refs.searchbar.value;
    store.session.get('query').concat(query);
    console.log(store.session.get('query'));
  },
  render: function() {
    return (
      <form className="searchbar-component" onSubmit={this.searchHandler}>
        <input className="searchbar" type="text" placeholder="dog parks" ref="searchbar" role="textbox" tabIndex="1"/>
        <input className="search-submit" type="submit" value="search" role="button" tabIndex="2"/>
        <i className="search-icon fa fa-search" aria-hidden="true"></i>
      </form>
      );
    }
});
