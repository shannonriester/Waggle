import Backbone from 'backbone';

import MatchModel from '../Models/MatchModel';

const MatchCollection = Backbone.Collection.extend({
  model: MatchModel,
  url: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/MatchCollection`,
  toggleMatch: function(session, likee) {
    let matchRequest = this.findMatch(session,likee).then((response) => {
      if (response.models[0]) {
        response.models[0].destroy();
        console.log('UNMATCHED WITH USER: ', likee);
        return false;
      } else {
        this.create({sender:session, likee:likee},{
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
    // let query = [{sender:session},{likee:likee}];
    // query = JSON.stringify(query);
    // console.log(query);

    let sentMatch= this.where({sender:session, likee:likee});
    let receiveMatch = this.where({sender:likee, likee:session});
    if (sentMatch.length + receiveMatch.length === 2) {
      return true;
    }
  },
  findAllMyMatches: function() {

  },
});

export default MatchCollection;
