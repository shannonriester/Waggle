import PlacesCollection from './Collections/PlacesCollection';
import PlaceModel from './Models/PlaceModel';
import SessionModel from './Models/SessionModel';

export default ({
  session: new SessionModel(),
  placeModel: new PlaceModel(),
  placesCollection: new PlacesCollection(),
  settings: {
      appKey: 'kid_SkBnla5Y',
      appSecret: 'e7a59b1546d74c5e824901fbab190092',
      basicAuth: btoa('kid_SkBnla5Y:e7a59b1546d74c5e824901fbab190092')
    },
  // foursquare: {
  //   clientID: 'H5L4YMYV2UTAUOA0YXXQM1WIXVLJGH45LGO0VM31PPAYMNHW',
  //   clientSecret: 'DUB0OMKZF5VBINPV5YUZSVGXE1BI12GIHBVIUHYI4XON4DY0',
  //   pushSecret: '15Z3W5SJP3JTJ55C2FV5REQOBG4ORVIWROERZDDSNOWIIKWN',
  // },
  entryImages: [
    '/assets/BeachFun.jpeg',
    '/assets/DogsAndFriendsBrunching.jpeg',
    '/assets/GroupAtPark.jpeg',
    '/assets/TwoGirlsWithSmallDogs.jpeg',
  ],

});
