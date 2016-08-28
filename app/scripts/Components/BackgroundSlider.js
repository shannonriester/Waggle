import React, { Component } from 'react';
var Slider = require('react-slick');

var BackgroundSlider = React.createClass({
  render: function() {
  let settings = {
    arrows: true,
    accessability: true,
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    focusOnSelect: true,
    swipe: true,
  }

  return (
    <div className="slider-container">
      <Slider ref="slider" {...settings}>
        <img src="/assets/profileImgs/dog6.jpeg" />
        <img src="/assets/profileImgs/dog5.jpeg" />
        <img src="/assets/profileImgs/dog3.jpeg" />
        <img src="/assets/profileImgs/dog4.jpeg" />
        <img src="/assets/profileImgs/dog1.jpeg" />
      </Slider>
      {//<div style={{textAlign: 'center'}}>
        //<button className="slider-btn prev-btn" onClick={this.previous}>Previous</button>
      //  <button className="slider-btn next-btn" onClick={this.next}>Next</button>
    //  </div>
    }
    </div>
  );
}
});

export default BackgroundSlider;
