import React from 'react';
import { Link } from 'react-router';
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
    let snippetText;
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


      let neighborhoods;
        if (this.state.placeModel.neighborhoods) {
          neighborhoods = <li><i className="compass-icon checkin-link-icon fa fa-compass" aria-hidden="true"></i> {this.state.placeModel.neighborhoods[0]}</li>
        }
      // console.log(this.state.placeModel);
      let yelpLink;
      if (this.state.placeModel.yelpMobileUrl) {
        yelpLink = this.state.placeModel.yelpMobileUrl;
        yelpLink.slice(0,1);
        let urlLength = yelpLink.length;
        yelpLink.slice(urlLength);
      }
      content = (
        <div className="place-item-content">
          <header className="place-image" style={styles}></header>
          <div className="place-item-content-container">
            <main className="main-place-item-page">
              <div className="place-heading-container">
                <h1 className="place-item-h1">{placeItem.name}</h1>
                <p className="snippet-text-checkin">{this.state.placeModel.snippetText}</p>
              </div>
              <div className="checkin-address-links-container">
                <ul className="checkin-address-ul">
                  <li><h4 className="address-heading">Address</h4></li>
                  <li>{this.state.placeModel.address[0]}</li>
                  <li>{this.state.placeModel.address[1]}</li>
                </ul>
                <ul className="checkin-links-ul">
                  <li className="yelp-link"><a href={yelpLink}><i className="yelp-icon checkin-link-icon fa fa-yelp" aria-hidden="true"></i> yelp</a></li>
                  {neighborhoods}
                  <li><i className="checkin-link-icon fa fa-map-marker" aria-hidden="true"></i>{this.state.placeModel.categories[0]}</li>
                </ul>
              </div>
            </main>
            <footer className="footer-users-checkedin">
              {checkedinUserPreview}
              {checkBtn}
            </footer>
          </div>
        </div>
      );
    }

    // console.log(this.state.placeModel.snippetText);

    return (
      <div className="place-item-component">
        <Nav />
        {content}
      </div>
    );
  }
});
