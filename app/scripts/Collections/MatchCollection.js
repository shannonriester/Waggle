import Backbone from 'backbone';

import MatchModel from '../Models/MatchModel';

const MatchCollection = Backbone.Collection.extend({
  model: MatchModel,
  url: `https://baas.kinvey.com/appdata/kid_SkBnla5Y/MatchCollection`,
  toggleMatch: function(session, likee) {
    return new Promise((resolve,reject) => {
      let matchRequest = this.findMatch(session, likee).then((response) => {
        console.log('toggleMatch response: ', response);
        if (response.length) {
          if (response.length > 1) {
            this.findWhere({sender: session, likee:likee}).destroy({
              success: () => {
                resolve('unmatched')
                // console.log('UNMATCHED WITH USER: ', likee);

              },
              error: (e) => {
                reject(e)
              }
            });

            // return false;
          } else if (response[0].get('sender') === session) {
            this.findWhere({sender: session, likee: likee}).destroy({
              success: () => {
                resolve('unmatched')
              },
              error: (e) => {
                reject(e)
              }
            });
          } else {
              console.log('creating match');
              this.create({sender: session, likee:likee},{
                success: (model, response) => {
                  // console.log('YOU MATCHED A PERSON!', model);
                  // console.log('SENT MATCH REQUEST TO: ', likee);
                  resolve('sent match')
                }
            });
          }
        } else {
          this.create({sender: session, likee:likee},{
            success: (model, response) => {
              // console.log('YOU MATCHED A PERSON!', model);
              // console.log('SENT MATCH REQUEST TO: ', likee);
              resolve('sent match')
              // return true;
            }
          });
        }

      });
    })
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
        let findMatches = response.models.filter((model, i) => {
          if ((model.get('sender') === session && model.get('likee') === likee) || (model.get('sender') === likee && model.get('likee') === session)) {
            return true;
          } else {
            return false;
          }
        });
        // console.log(findMatches);
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
