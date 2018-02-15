const request = require('request');

const config = require('../config/config');
const constants = require('../config/constants');
const logger = require('../services/logger');

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

module.exports.sendTextMessage = sendTextMessage;
