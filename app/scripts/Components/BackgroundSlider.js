import React, { Component } from 'react';
var Slider = require('react-slick');

import store from '../store';

var BackgroundSlider = React.createClass({
  getInitialState: function() {
    return {
      imgSrc: [],
      defaultImgs: [],
    }
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.profile.bkgrndImgs.length) {
      let imgArr = newProps.profile.bkgrndImgs.map((imgSrc, i) => {
        return newProps.profile.bkgrndImgs[i];
      });
      this.setState({imgSrc: imgArr});
    }
  },
  render: function() {
  let settings = {
    arrows: true,
    accessability: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    focusOnSelect: true,
    swipe: true,
  }

  let imgArr = this.state.imgSrc.map((source, i) => {
    return (<img className="background-profile-image" key={i} src={source} />)
  });

  return (
    <div className="slider-container">
      <Slider ref="slider" {...settings}>
        {imgArr}
      </Slider>
    </div>
  );
}
});

export default BackgroundSlider;
