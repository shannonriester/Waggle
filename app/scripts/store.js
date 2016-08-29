import CheckinCollection from './Collections/CheckinCollection';
import PlacesCollection from './Collections/PlacesCollection';
import UserCollection from './Collections/UserCollection';
import MessagesCollection from './Collections/MessagesCollection';
import MatchCollection from './Collections/MatchCollection';
import PlaceModel from './Models/PlaceModel';
import SessionModel from './Models/SessionModel';
import MessageModel from './Models/MessageModel';
import MatchModel from './Models/MessageModel';

export default ({
  session: new SessionModel(),
  placeModel: new PlaceModel(),
  placeModel: new MessageModel(),
  matchModel: new MatchModel(),
  placesCollection: new PlacesCollection(),
  userCollection: new UserCollection(),
  checkinCollection: new CheckinCollection(),
  messagesCollection: new MessagesCollection(),
  matchCollection: new MatchCollection(),
  settings: {
      appKey: 'kid_SkBnla5Y',
      appSecret: 'e7a59b1546d74c5e824901fbab190092',
      basicAuth: btoa('kid_SkBnla5Y:e7a59b1546d74c5e824901fbab190092'),
    },
  entryImages: [
    '/assets/BeachFun.jpeg',
    '/assets/DogsAndFriendsBrunching.jpeg',
    '/assets/GroupAtPark.jpeg',
    '/assets/TwoGirlsWithSmallDogs.jpeg',
  ],
  google: {
    appKey: 'AIzaSyBGH9fSjS0D-dpIgVYpOUfg5F63Igifl7I',
  }

});
