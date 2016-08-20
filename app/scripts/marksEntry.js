import $ from 'jquery'
// import ajax from './ajax'
import React from 'react'
import ReactDOM from 'react-dom'
import router from './router'
import store from './store'

// import Visit from './models/Visit'

import GoogleMap from 'google-map-react';


// if (localStorage.authtoken) {
//   store.session.set('authtoken', localStorage.authtoken)
//   store.session.retrieve()
// } else {
//   store.session.set('authtoken', store.settings.anomToken)
//   store.session.retrieve()
//   let visit = new Visit()
//   visit.getData()
// }
//
// store.plans.fetch({
//   success: (r) => {
//     // console.log(r);
//   },
//   error: (e) => {
//     console.error('error: ', e);
//   }
// })



let SimpleMapPage = React.createClass({
  // static propTypes = {
  //   center: PropTypes.array,
  //   zoom: PropTypes.number,
  //   greatPlaceCoords: PropTypes.any
  // };
  //
  // static defaultProps = {
  //   center: [59.938043, 30.337157],
  //   zoom: 9,
  //   greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  // };
  //
  // shouldComponentUpdate = shouldPureComponentUpdate;
  //
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
       <GoogleMap
        // apiKey={AIzaSyBGH9fSjS0D-dpIgVYpOUfg5F63Igifl7I} // set if you need stats etc ...
        center={[59.938043, 30.337157]}
        zoom={9}>

      </GoogleMap>
    );
  }
})

// ReactDOM.render(router, document.getElementById('container'))
ReactDOM.render(<SimpleMapPage/>, document.getElementById('container'))
