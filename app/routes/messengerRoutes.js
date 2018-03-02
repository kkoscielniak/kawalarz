const router = require('express').Router();

const constants = require('../config/constants');

const jokes = require('../model/jokes');
const predefinedMessages = require('../model/predefinedMessages');

const sender = require('../helpers/messengerSender');
const {
  getHappyEmoji,
  getSadEmoji,
} = require('../helpers/emojiHelper');
const aiHelper = require('../helpers/aiHelper');
const { getRandomMessage } = require('../helpers/messagesHelper');

const sendAGreeting = async senderId => {
  const greeting = `${getRandomMessage(predefinedMessages.greetings)} ${getHappyEmoji()}`;
  sender.sendTypingIndicator(senderId);
  await sender.sendTextMessage(senderId, greeting);
};

const sendAJoke = async senderId => {
  const joke = getRandomMessage(jokes);

  sender.sendTypingIndicator(senderId);
  await sender.sendTextMessage(senderId, joke.question);
  sender.sendTypingIndicator(senderId);
  await sender.sendTextMessage(senderId, `${joke.answer} ${getHappyEmoji()}`);
  await sender.askAboutFeedback(senderId);
};

const sendAbout = async senderId => {
  const aboutMe = `
    ${getRandomMessage(predefinedMessages.iAm)}, ${getRandomMessage(predefinedMessages.aboutMe)} ${getHappyEmoji()}
  `;

  sender.sendTypingIndicator(senderId);
  await sender.sendTextMessage(senderId, aboutMe);
};

router.get('/', (req, res) => {
  res.send('Hello world, I am a chat bot');
});

router.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === 'challenge_token') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong token');
});

router.post('/webhook', async(req, res) => {
  const messagingEvents = req.body.entry[0].messaging;

  for (let i = 0; i < messagingEvents.length; i++) {
    const event = req.body.entry[0].messaging[i];
    const senderId = event.sender.id;

    if (event.message && event.message.text) {
      const intent = await aiHelper.getIntent(event.message.text);

      switch (intent) {
        case constants.INTENTS.GREET:
          await sendAGreeting(senderId);
          break;
        case constants.INTENTS.GET_JOKE:
          await sendAJoke(senderId);
          break;
        case constants.INTENTS.ABOUT_YOU:
          await sendAbout(senderId);
          break;
        default:
          sender.sendTextMessage(senderId, `${getRandomMessage(predefinedMessages.didNotUnderstand)} ${getSadEmoji()}`);
          break;
      }
    } else if (event.postback && event.postback.payload) {
      switch (event.postback.payload) {
        case constants.FEEDBACK.GOOD:
          await sender.askAboutNewJoke(senderId);
          break;
        case constants.FEEDBACK.BAD:
          await sender.sendTextMessage(senderId, getSadEmoji());
          break;
        case constants.FEEDBACK.NEXT:
          sendAJoke(senderId);
          break;
        case constants.FEEDBACK.STOP:
          await sender.sendTextMessage(senderId, `Okej ${getHappyEmoji()}`);
          break;
      }
    }
  }

  res.sendStatus(200);
});

module.exports = router;
