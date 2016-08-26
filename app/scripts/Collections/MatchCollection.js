import Backbone from 'backbone';

import MatchModel from '../Models/MatchModel';

const MatchCollection = Backbone.Collection.extend({
  model: MatchModel,
  url: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/MatchCollection`,
  toggleMatch: function(session, likee) {
    let matchRequest = this.findMatch(session, likee).then((response) => {
      console.log(response);
      if (response.length > 1) {
        this.findWhere({sender: session, likee:likee}).destroy();
        console.log('UNMATCHED WITH USER: ', likee);
        return false;
      } else if (response.length === 1 && response[0].sender === session) {
        this.findWhere({sender:session, likee:likee}).destroy();
        return false;
      }
        else {
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
      success: (response) => {
        // console.log(response);
        let findMatches = response.models.filter((model, i) => {
          // console.log(model);
          if ((model.get('sender') === session && model.get('likee') === likee) || (model.get('sender') === likee && model.get('likee') === session)) {
            return true;
          } else {
            return false;
          }
        });
        console.log(findMatches);
        resolve (findMatches);
      },
      error: function (response) {
          console.error('FAILED TO FETCH MY MESSAGES ', response);
          reject();
      }});
    });
  },
  allMyMatches: function(session) {

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
