import SessionModel from './Models/SessionModel';

export default ({
  session: new SessionModel(),
  settings: {
      appKey: 'kid_SkBnla5Y',
      appSecret: 'e7a59b1546d74c5e824901fbab190092',
      basicAuth: btoa('kid_SkBnla5Y:e7a59b1546d74c5e824901fbab190092')
    },
  entryImages: [
    '/assets/BeachFun.jpeg',
    '/assets/DogsAndFriendsBrunching.jpeg',
    '/assets/GroupAtPark.jpeg',
    '/assets/TwoGirlsWithSmallDogs.jpeg',
  ],

});
