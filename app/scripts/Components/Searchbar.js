import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';

export default React.createClass({
  searchHandler: function(e) {
    e.preventDefault();
    let query = this.refs.searchbar.value;
    store.session.set('query', query);
    console.log('query on searchbar ', store.session.get('query'));
    store.placesCollection.getResults(store.session.get('query'));
    // browserHistory.push(`/search/${query}`);
    // sessionStorage.searchTerm = query;
    // console.log(store.session.get('query'));
  },
  render: function() {
    return (
      <form className="searchbar-component" onSubmit={this.searchHandler}>
        <input className="searchbar" type="search" placeholder="dog parks" ref="searchbar" role="search" tabIndex="1"/>
        <input className="search-submit" type="submit" value="search" role="button" tabIndex="2"/>
        <i className="search-icon fa fa-search" aria-hidden="true" onClick={this.searchHandler}></i>
      </form>
      );
    }
});
