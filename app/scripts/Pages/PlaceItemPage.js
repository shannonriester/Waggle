import React from 'react';
import _ from 'underscore';

import store from '../store';
import Nav from '../Components/Nav';
import CheckedinUserPreview from '../Components/CheckedinUserPreview';

export default React.createClass({
    getInitialState: function() {
      return {
        placeModel: {},
        checkedin: store.userCollection.findWhere({username: store.session.get('username')}),
        checkinList: null,
        checkedinModels: [],
        intervalCheckout: false,
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
      // let interval = setTimeout(() => {
      //   this.setState({intervalCheckout:!this.state.intervalCheckout});
      // // }, 1800000);
      // }, 5000);
      //
      // this.setState({intervalCheckout:interval});

      // this.setState({checkout:false});
    },
    toggleCheckinList: function() {
      this.setState({checkinList: !this.state.checkinList});
    },
    updateState: function() {
      if (store.placesCollection.findWhere({yelpID: this.props.params.placeId}) && store.checkinCollection.where({place:this.props.params.placeId})){
      this.setState({
        placeModel: store.placesCollection.findWhere({yelpID: this.props.params.placeId}).toJSON(),
        checkedinModels: store.checkinCollection.where({place:this.props.params.placeId}),
        checkedin: store.userCollection.findWhere({username: store.session.get('username')}),
      });
    }
    },
    componentWillMount: function() {
      store.checkinCollection.fetch();
      store.userCollection.fetch();
    },
    componentDidMount: function() {
      if (store.placesCollection.findWhere({yelpID: this.props.params.placeId}) &&  store.checkinCollection.where({place:this.props.params.placeId})){
        this.setState({
          placeModel: store.placesCollection.findWhere({yelpID: this.props.params.placeId}).toJSON(),
          checkedinModels: store.checkinCollection.where({place:this.props.params.placeId}),
          checkedin: store.userCollection.findWhere({username: store.session.get('username')}),
        });
      } else {
        store.placesCollection.getYelpResult(this.props.params.placeId, store.session.get('city'));
      }
      store.checkinCollection.on('change update', this.updateState);
      store.placesCollection.on('change update', this.updateState);
    },
    componentWillUnmount: function() {
      store.placesCollection.off('change update', this.updateState);
      store.checkinCollection.off('change update', this.updateState);
      store.userCollection.off('change update', this.updateState);
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

        let checkedin;
        console.log('this.state.checkedin ',this.state.checkedin);

        // console.log('this.state.users', this.state.users);
        let checkBtn = (<button className="checkin-btn" onClick={this.toggleCheckin}>Check in here!</button>);
        if (this.state.checkedin) {
          checkedin = "checked-in";
          checkBtn = (<button className="checkin-btn" id={checkedin} onClick={this.toggleCheckin}>Checked in!</button>);
        }
        // if (this.state.intervalCheckout) {
          // checkBtn = (<button className="checkin-btn" onClick={this.toggleCheckin}>Checkout?</button>);
        // }
        content = (
          <div className="result-item-container">
            <div className="place-image" style={styles}><h1>{placeItem.name}</h1></div>
            <div className="content-container">

              <footer className="footer-users-checkedin">
                {checkedinList}
                <button className="users-checkedin-btn" onClick={this.toggleCheckinList}>Who's here?</button>
                {checkBtn}
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
