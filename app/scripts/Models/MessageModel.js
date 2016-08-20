import Backbone from 'backbone';
import moment from 'moment';

const MessageModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/appdata/kid_SkBnla5Y/MessagesCollection`,
  defaults: {
      timestamp: new Date(),
      sender: '',
      recipient: '',
      body: '',
  },
});

export default MessageModel;
