const router = require('express').Router();

const sender = require('./sender');
const jokesController = require('../api/controller/jokesController');

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
      sender.sendTypingIndicator(senderId);

      const joke = jokesController.getRandomJoke();

      await sender.sendTextMessage(senderId, joke.question);

      sender.sendTypingIndicator(senderId);

      await sender.sendTextMessage(senderId, joke.answer);
      await sender.askAboutFeedback(senderId);
    } else if (event.postback) {
      const text = JSON.stringify(event.postback);
      sender.sendTextMessage(senderId, `Postback received: ${text.substring(0, 200)}`);
      console.log(event.postback);
    }
  }

  res.sendStatus(200);
});

module.exports = router;
