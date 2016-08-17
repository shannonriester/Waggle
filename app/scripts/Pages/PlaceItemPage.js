import React from 'react';
import _ from 'underscore';

import store from '../store';
import Nav from '../Components/Nav';
import CheckedinUserPreview from '../Components/CheckedinUserPreview';

export default React.createClass({
    getInitialState: function() {
      return {
        placeModel: {},
        checkin: false,
        checkinList: null,
        checkedinModels: [],
      }
    },
    toggleCheckin: function() {
      store.checkinCollection.toggleCheckin(store.session.get('username'), this.props.params.placeId);
    },
    toggleCheckinList: function() {
      this.setState({checkinList: !this.state.checkinList});
      // console.log(this.state.checkedinModels);
    },
    updateState: function() {
      if (store.placesCollection.findWhere({yelpID: this.props.params.placeId}) && store.checkinCollection.where({place:this.props.params.placeId})){
      this.setState({
        placeModel: store.placesCollection.findWhere({yelpID: this.props.params.placeId}).toJSON(),
        checkedinModels: store.checkinCollection.where({place:this.props.params.placeId}),
      });
    }
    },
    componentWillMount: function() {
      store.checkinCollection.fetch();
    },
    componentDidMount: function() {
      if (store.placesCollection.findWhere({yelpID: this.props.params.placeId}) &&  store.checkinCollection.where({place:this.props.params.placeId})){
        this.setState({
          placeModel: store.placesCollection.findWhere({yelpID: this.props.params.placeId}).toJSON(),
          checkedinModels: store.checkinCollection.where({place:this.props.params.placeId}),
        });
      } else {
        store.placesCollection.getYelpResult(this.props.params.placeId);
      }
      store.checkinCollection.on('change update', this.updateState);
      store.placesCollection.on('change update', this.updateState);
    },
    componentWillUnmount: function() {
      store.placesCollection.off('change update', this.updateState);
      store.checkinCollection.off('change update', this.updateState);
    },
    render: function() {
      let content;
      if (this.state.placeModel.name) {
        let placeItem = this.state.placeModel;
        let url = placeItem.imageUrl.replace('ms', 'l');
        let styles = {backgroundImage: 'url(' + url + ')'};

        placeItem = this.state.placeModel;

        let checkedinList;
        let users = <CheckedinUserPreview checkedinModels={this.state.checkedinModels} />;
        if (this.state.checkinList) {
          checkedinList = (
            <ul className="ulist-users-checkedin">
              {users}
            </ul>
          );
        }

        content = (
          <div className="result-item-container" style={styles}>
            <div className="content-container">
              <h1>{placeItem.name}</h1>
              <button className="checkin-btn" onClick={this.toggleCheckin}>Check in here!</button>
              <footer className="footer-users-checkedin">
                <button className="users-checkedin-btn" onClick={this.toggleCheckinList}>Who's here?</button>
                {checkedinList}
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
