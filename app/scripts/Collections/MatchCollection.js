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
    let query = [{sender:session},{likee:likee}];
    query = JSON.stringify(query);

    return new Promise((resolve, reject) => {
      this.fetch({url:`https://baas.kinvey.com/appdata/kid_SkBnla5Y/MatchCollection?query={"$or":${query}}`,
      success: (response) => {
        resolve(response);

      }, error: function (response) {
          console.error('FAILED TO FETCH MY MESSAGES ', response);
          reject();
      }});
    });
  },
  findAllMyMatches: function() {
    
  },
});

export default MatchCollection;
