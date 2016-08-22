import React from 'react';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      infoBox: this.props.infoBox,
    }
  },
  clickedMarker: function() {
    store.placeModel.set('infoBox', true);
    this.setState({infoBox:true});
    this.props.updateState();
  },
  updateState: function() {
    this.setState({infoBox: store.placeModel.get('infoBox')});
  },
  componendDidMount: function() {
    store.placeModel.get('infoBox');
    store.placeModel.on('change update', this.updateState);
  },
  render: function() {
    let url = `/assets/Icons/paw.svg`;
    let backgroundImage = {backgroundImage: 'url(' + url + ')'};
    let me;
    if (this.props.id === 'my-location') {
      me = 'my-location'
    }

    let infoBox;
    console.log(this.props.infoBox);
    if (this.state.infoBox && this.props.infoBox) {
      infoBox = (
        <div className="infobox-container">
          <section className="place-img-name">
            <img src={this.props.infoBox.imageUrl} />
          </section>
          <section className="address-section">
            <h3>{this.props.infoBox.name}</h3>
            {this.props.infoBox.address[0]}
            {this.props.infoBox.address[1]}
          </section>
        </div>
      );
    }
    return (
      <div id={me} className="place-marker" onClick={this.clickedMarker}>
        {infoBox}
        <img className="paw-icon" src="/assets/Icons/paw-white.svg" alt="dog-paw-print-icon" />
      </div>
    );
  }
});
