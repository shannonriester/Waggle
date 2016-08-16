import React from 'react';
import _ from 'underscore';

import store from '../store';
import Nav from '../Components/Nav';

export default React.createClass({
    getInitialState: function() {
      return {
        placeModel: {},
        footer: false,
      }
    },
    toggleCheckedinList: function() {

    },
    updateState: function() {
      this.setState({placeModel: store.placesCollection.findWhere({yelpID: this.props.params.placeId}).toJSON()});
    },
    componentDidMount: function() {
      store.placesCollection.on('change update', this.updateState);

      if (store.placesCollection.findWhere({yelpID: this.props.params.placeId})) {
        this.setState({placeModel: store.placesCollection.findWhere({yelpID: this.props.params.placeId}).toJSON()});
      } else {
        store.placesCollection.getYelpResult(this.props.params.placeId);
      }
    },
    componentWillUnmount: function() {
      store.placesCollection.off('change update', this.updateState);
    },
    render: function() {
      let content;
      if (this.state.placeModel.name) {
        let placeItem = this.state.placeModel;

        let url = placeItem.imageUrl.replace('ms', 'l');
        let styles = {backgroundImage: 'url(' + url + ')'};

        placeItem = this.state.placeModel;
        content = (
          <div className="result-item-container" style={styles}>

            <div className="content-container">
              <h1>{placeItem.name}</h1>
              <button className="checkin-btn" onClick={this.toggleCheckedinList}>Check in here!</button>
              <footer className="footer-users-checkedin">
                <ul className="ulist-users-checkedin">
                  <li>Shannon</li>
                  <li>Auggie</li>
                  <li>Max</li>
                </ul>
                <button className="users-checkedin-btn">Who's here?</button>
              </footer>
            </div>

          </div>
        );
      }

      return (
        <div className="result-item-component">
          <Nav />
          {content}
        </div>
      );
    }
});
