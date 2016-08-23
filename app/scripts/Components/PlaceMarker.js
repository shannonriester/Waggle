import React from 'react';
import { Link } from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      checkedinWagglrs: store.checkinCollection.where({place: this.props.id}),
    }
  },
  clickedMarker: function() {
    store.placesCollection.forEach((model) => {
      model.set('infoBox', false);
    });
    store.placesCollection.findWhere({yelpID: this.props.id}).set('infoBox', true);
  },
  updateState: function() {
    store.checkinCollection.where({place: this.props.id});
  },
  componentDidMount: function() {
    store.checkinCollection.fetch();
    store.checkinCollection.where({place: this.props.id});

    store.checkinCollection.on('change update', this.updateState);
  },
  componentWillUnmount: function() {
    store.checkinCollection.off('change update', this.updateState);
  },
  render: function() {
    let url = `/assets/Icons/paw.svg`;
    let backgroundImage = {backgroundImage: 'url(' + url + ')'};
    let me;
    if (this.props.id === 'my-location') {
      me = 'my-location'
    }

    // console.log(store.checkinCollection);
    // console.log(this.state.checkedinWagglrs);
    // let innerBorder;
    // let outerBorder;
    let placeMarker;
    if (this.state.checkedinWagglrs.length < 3) {
      placeMarker = (<div className="icon-container"><img className="paw-icon" src="/assets/Icons/paw-white.svg" alt="dog-paw-print-icon" /></div>);
    } else if (this.state.checkedinWagglrs.length >= 3) {
      placeMarker = (<div className="outer-pulse-radius"><img className="inner-pulse-radius" src="/assets/Icons/paw-white.svg" alt="dog-paw-print-icon" /></div>);
    }
    // if (this.props)
    // console.log(this.props.id);

    let infoBox;
    if (this.props.showInfoBox) {
      infoBox = (
        <div className="infobox-container">
          <section className="place-img-name">
            <Link to={`/places/${this.props.infoBox.yelpID}`}><img src={this.props.infoBox.imageUrl} /></Link>
          </section>
          <section className="address-section">
            <Link to={`/places/${this.props.infoBox.yelpID}`}><h3>{this.props.infoBox.name}</h3></Link>
            {this.props.infoBox.address[0]}
            {this.props.infoBox.address[1]}
          </section>
        </div>
      );
    }
    return (
      <div id={me} className="place-marker" onClick={this.clickedMarker}>
        {infoBox}
        {placeMarker}
      </div>
    );
  }
});
