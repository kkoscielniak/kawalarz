const router = require('express').Router();

const constants = require('../config/constants');
const sender = require('./sender');
const jokesController = require('../app/controller/jokesController');

const sendAJoke = async senderId => {
  const joke = jokesController.getRandomJoke();

  sender.sendTypingIndicator(senderId);
  await sender.sendTextMessage(senderId, joke.question);
  sender.sendTypingIndicator(senderId);
  await sender.sendTextMessage(senderId, joke.answer);
  await sender.askAboutFeedback(senderId);
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
      sendAJoke(senderId);
    } else if (event.postback && event.postback.payload) {
      switch (event.postback.payload) {
        case constants.FEEDBACK.GOOD:
          await sender.askAboutNewJoke(senderId);
          break;
        case constants.FEEDBACK.BAD:
          await sender.sendTextMessage(senderId, ':(');
          break;
        case constants.FEEDBACK.NEXT:
          sendAJoke(senderId);
          break;
        case constants.FEEDBACK.STOP:
          await sender.sendTextMessage(senderId, 'Okej :)');
          break;
      }
    }
  }

  res.sendStatus(200);
});

module.exports = router;
