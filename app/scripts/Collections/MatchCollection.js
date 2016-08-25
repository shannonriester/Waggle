import Backbone from 'backbone';

import MatchModel from '../Models/MatchModel';

const MatchCollection = Backbone.Collection.extend({
  model: MatchModel,
  url: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/MatchCollection`,
  toggleMatch: function(session, likee) {
    let matchRequest = this.findMatch(session, likee).then((response) => {
      console.log(response.models);
      if (response.models.length > 1) {
        this.findWhere({sender: session}).destroy();
        console.log('UNMATCHED WITH USER: ', likee);
        return false;
      } else {
        this.create({sender: session, likee:likee},{
          success: (model, response) => {
            console.log('YOU MATCHED A PERSON!', model);
            console.log('SENT MATCH REQUEST TO: ', likee);
            return true;
          }
        });
      }
    });
  },
  findMatch: function(session, likee) {
    //mongo: DOCUMENT DATA (not relational) database (just stores json data)
    return new Promise((resolve, reject) => {
      this.fetch({
      data: {query: JSON.stringify({
        $or: [
          {sender: session, likee: likee},
          {sender: likee, likee: session},
        ]
      })},
      success: resolve,
      error: function (response) {
          console.error('FAILED TO FETCH MY MESSAGES ', response);
          reject();
      }});
    });
  },
  allMyMatches: function(session) {
    // console.log(session);
    return new Promise((resolve, reject) => {
      this.fetch({
      data: {query: JSON.stringify({
        $or: [
          {sender: session},
          {likee: session},
        ]
      })},
      success: (response) => {
        // console.log(response);
      let allMatchesArr = response.toJSON().filter((matchModel, i, arr) => {
          if (matchModel.sender === session && this.findWhere({sender: matchModel.likee})) {
            console.log(matchModel.likee);
            return true;
          }
        }).map((model) => {
          return model.likee;
        });
        resolve (allMatchesArr);
      },
      error: function (response) {
          console.error('FAILED TO FETCH MY MESSAGES ', response);
          reject();
      }});
    });
  },
});

export default MatchCollection;
