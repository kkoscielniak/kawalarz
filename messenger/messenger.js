const request = require('request');
const config = require('../config/config');

/**
 * Sends a message via Facebook Messenger
 * @param {string} id recipients ID
 * @param {string} text message to be sent
 */
const sendTextMessage = (id, text) => {
  const message = {
    text,
  };

  request({
    method: 'POST',
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: config.accessToken,
    },
    json: {
      recipient: {
        id,
        message,
      },
    },
  });
};

module.exports.sendTextMessage = sendTextMessage;
