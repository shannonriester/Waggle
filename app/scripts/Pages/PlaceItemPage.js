import React from 'react';
import _ from 'underscore';

import store from '../store';
import Nav from '../Components/Nav';
import CheckedinUserPreview from '../Components/CheckedinUserPreview';

export default React.createClass({
  getInitialState: function() {
    return {
      placeModel: {},
      fetched: false,
      checkedinModels: [],
      intervalCheckout: false,
      users: store.userCollection.toJSON(),
      checkedin: store.checkinCollection.where({
        place: this.props.params.placeId,
        userCheckedin: store.session.get('username')
      }),
    }
  },
  toggleCheckin: function() {
    let userModel = store.userCollection.findWhere({username: store.session.get('username')});
    store.checkinCollection.toggleCheckin(
        store.session,
        userModel,
        this.props.params.placeId,
        this.state.intervalCheckout
      );
    this.updateState();
    this.setState({
      users: store.userCollection.toJSON(),
      checkedin: store.checkinCollection.where({
        place: this.props.params.placeId,
        userCheckedin: store.session.get('username'),
      }),
    });
  },
  updateState: function() {
    if (store.placesCollection.findWhere({yelpID: this.props.params.placeId}) && store.checkinCollection.where({place:this.props.params.placeId})) {
      this.setState({
        users: store.userCollection.toJSON(),
        placeModel: store.placesCollection.findWhere({yelpID: this.props.params.placeId}).toJSON(),
        checkedinModels: store.checkinCollection.where({place:this.props.params.placeId}),
        checkedin: store.checkinCollection.where({
          place: this.props.params.placeId,
          userCheckedin: store.session.get('username')
        }),
      });
    }

    if (store.checkinCollection.models.length && !this.state.fetched) {
      store.checkinCollection.models.forEach((checkinModel) => {
        checkinModel = checkinModel.toJSON();
        store.userCollection.findUser(checkinModel.userCheckedin);
        this.setState({
          fetched: true,
        });
      });
    }

  },
  componentDidMount: function() {
    if (store.placesCollection.findWhere({yelpID: this.props.params.placeId}) &&  store.checkinCollection.where({place:this.props.params.placeId})){
      this.setState({
        users: store.userCollection.toJSON(),
        placeModel: store.placesCollection.findWhere({yelpID: this.props.params.placeId}).toJSON(),
        checkedinModels: store.checkinCollection.where({place:this.props.params.placeId}),
        checkedin: store.checkinCollection.where({
          place: this.props.params.placeId,
          userCheckedin: store.session.get('username')
        }),
      });
    } else {
      store.placesCollection.getYelpResult(this.props.params.placeId, store.session.get('city'));
    }
    store.placesCollection.on('update', this.updateState);
    store.checkinCollection.on('update', this.updateState);
    store.userCollection.on('update', this.updateState);
  },
  componentWillUnmount: function() {
    store.placesCollection.off('update', this.updateState);
    store.checkinCollection.off('update', this.updateState);
    store.userCollection.off('update', this.updateState);
  },
  render: function() {
    let content;
    if (this.state.placeModel.name) {
      let placeItem = this.state.placeModel;
      let styles = {backgroundImage: 'url(' + placeItem.imageUrl + ')'};

      let checkedinUserPreview;
      let users;
      let checkedinArr = [];
      let wagglrsArr = [];
      if (this.state.users && this.state.checkedinModels) {
            let wagglrs = this.state.checkedinModels.forEach((checkedin, i) => {
            checkedin = checkedin.toJSON();
            let wagglrs = store.userCollection.where({username: checkedin.userCheckedin});
            if (wagglrs[0]) {
              wagglrs = wagglrs[0].attributes;
              wagglrsArr.push(wagglrs);
              checkedinArr.push(checkedin);
            }

          });
          users = (<CheckedinUserPreview users={wagglrsArr} checkedin={checkedinArr} />);
          checkedinUserPreview = (
            <ul className="ulist-users-checkedin">
              {users}
            </ul>
          );
      }

      let checkedin;
      let checkBtn = (<button className="checkin-btn" onClick={this.toggleCheckin}>Check in here!</button>);
      if (this.state.checkedin[0]) {
        checkedin = "checked-in";
        checkBtn = (<button className="checkin-btn" id={checkedin} onClick={this.toggleCheckin}>Checked in!</button>);
      }
      content = (
        <div className="place-item-content">
          <header className="place-image" style={styles}><h1 className="place-item-h1">{placeItem.name}</h1></header>
          <div className="content-container">
            <main className="main-place-item-page"></main>
            <footer className="footer-users-checkedin">
              {checkedinUserPreview}
              {checkBtn}
            </footer>
          </div>
        </div>
      );
    }

    return (
      <div className="place-item-component">
        <Nav />
        {content}
      </div>
    );
  }
});
