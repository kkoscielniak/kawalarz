const request = require('request');

const config = require('../config/config');
const constants = require('../config/constants');
const logger = require('../services/logger');

const sendTypingIndicator = id => {
  request({
    method: 'POST',
    url: constants.FACEBOOK_GRAPH_URL,
    qs: {
      access_token: config.accessToken,
    },
    json: {
      recipient: {
        id,
      },
      sender_action: 'typing_on',
    },
  });
};

/**
 * Sends a text message via Facebook Messenger
 * @param {string} id recipients ID
 * @param {string} text message to be sent
 */
const sendTextMessage = (id, text) => {
  request({
    method: 'POST',
    url: constants.FACEBOOK_GRAPH_URL,
    qs: {
      access_token: config.accessToken,
    },
    json: {
      recipient: {
        id,
      },
      message: {
        text,
      },
    },
  },
  (err, res) => {
    if (err) {
      logger.info(err);
    } else if (res.body.error) {
      logger.info(res.body.err);
    }
  });
};

module.exports.sendTypingIndicator = sendTypingIndicator;
module.exports.sendTextMessage = sendTextMessage;


function sendGenericMessage(id) {
  console.log(id);
  const messageData = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [{
          title: 'Dobre? ',
          subtitle: 'Element #1 of an hscroll',
          buttons: [{
            type: 'postback',
            title: 'Słabe',
            payload: 'asdf',
          }, {
            type: 'postback',
            title: 'Słabe',
            payload: 'zxcv',
          }],
        }],
      },
    },
  };
  request({
    url: constants.FACEBOOK_GRAPH_URL,
    qs: {
      access_token: config.accessToken,
    },
    method: 'POST',
    json: {
      recipient: { id },
      message: messageData,
    },
  }, function(err, res) {
    if (err) {
      console.log('Error sending messages: ', err);
    } else if (res.body.error) {
      console.log('Error: ', res.body.error);
    }
  });
}

module.exports.sendGenericMessage = sendGenericMessage;
