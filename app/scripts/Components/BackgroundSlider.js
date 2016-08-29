import React, { Component } from 'react';
var Slider = require('react-slick');

var BackgroundSlider = React.createClass({
  getInitialState: function() {
    return {
      imgSrc: [],
      defaultImgs: [],
    }
  },
  componentWillReceiveProps: function(newProps) {
    // console.log(newProps.profile.bkgrndImgs[0]);

    if (newProps.profile.bkgrndImgs.length) {
      let imgArr = newProps.profile.bkgrndImgs.map((imgSrc, i) => {
        console.log(imgSrc);
        return newProps.profile.bkgrndImgs[i];
      });
      this.setState({imgSrc: imgArr});
      // this.setState({imgSrc: [newProps.profile.bkgrndImgs[0]]});
    } else {
      let assetsArr = [
        '/assets/profileImgs/dog6.jpeg',
        '/assets/profileImgs/dog5.jpeg',
        '/assets/profileImgs/dog3.jpeg',
        '/assets/profileImgs/dog4.jpeg',
        '/assets/profileImgs/dog1.jpeg'
      ];
      this.setState({imgSrc: assetsArr});
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
    return (<img key={i} src={source} />)
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
