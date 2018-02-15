const request = require('request');
const delay = require('delay');

const config = require('../config/config');
const constants = require('../config/constants');
const logger = require('../services/logger');
const emojiHelper = require('../app/helpers/emojiHelper');

const requestParams = {
  method: 'POST',
  url: constants.FACEBOOK_GRAPH_URL,
  qs: {
    access_token: config.accessToken,
  },
};

/**
 * Sends a typing indicator 💬
 * @param {string} id recipients ID
 */
const sendTypingIndicator = async id => {
  await request({
    ...requestParams,
    json: {
      recipient: {
        id,
      },
      sender_action: constants.MESSENGER_ACTIONS.TYPING_ON,
    },
  });
};

/**
 * Sends a text message via Facebook Messenger
 * @param {string} id recipients ID
 * @param {string} text message to be sent
 */
const sendTextMessage = async(id, text) => {
  await delay(text.length * 100);

  request({
    ...requestParams,
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
      logger.info(res.body.error);
    }
  });
};

/**
 * Sends a card asking for feedback about the joke
 * @param {string} id recipients ID
 */
const askAboutFeedback = async id => {
  await delay(750);

  const message = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [{
          title: 'Podoba Ci się?',
          buttons: [{
            type: 'postback',
            title: `Dobre ${emojiHelper.getHappyEmoji()}`,
            payload: constants.FEEDBACK.GOOD,
          }, {
            type: 'postback',
            title: `Słabe ${emojiHelper.getSadEmoji()}`,
            payload: constants.FEEDBACK.BAD,
          }],
        }],
      },
    },
  };

  request({
    ...requestParams,
    json: {
      recipient: {
        id,
      },
      message,
    },
  }, (err, res) => {
    if (err) {
      logger.info(err);
    } else if (res.body.error) {
      logger.info(res.body.error);
    }
  });
};

module.exports.sendTypingIndicator = sendTypingIndicator;
module.exports.sendTextMessage = sendTextMessage;
module.exports.askAboutFeedback = askAboutFeedback;

/**
 * Sends a card asking if the user wants to read new joke
 * @param {string} id recipients ID
 */
const askAboutNewJoke = async id => {
  await delay(750);

  const message = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [{
          title: 'Chcesz więcej?',
          buttons: [{
            type: 'postback',
            title: `Jasne! ${emojiHelper.getHappyEmoji()}`,
            payload: constants.FEEDBACK.NEXT,
          }, {
            type: 'postback',
            title: 'Nie, dzięki.',
            payload: constants.FEEDBACK.STOP,
          }],
        }],
      },
    },
  };

  request({
    ...requestParams,
    json: {
      recipient: {
        id,
      },
      message,
    },
  }, (err, res) => {
    if (err) {
      logger.info(err);
    } else if (res.body.error) {
      logger.info(res.body.error);
    }
  });
};

module.exports.sendTypingIndicator = sendTypingIndicator;
module.exports.sendTextMessage = sendTextMessage;
module.exports.askAboutFeedback = askAboutFeedback;
module.exports.askAboutNewJoke = askAboutNewJoke;
