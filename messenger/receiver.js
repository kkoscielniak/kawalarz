const router = require('express').Router();
const sender = require('./sender');

router.get('/', (req, res) => {
  res.send('Hello world, I am a chat bot');
});

router.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === 'challenge_token') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong token');
});

router.post('/webhook', (req, res) => {
  const messagingEvents = req.body.entry[0].messaging;

  for (let i = 0; i < messagingEvents.length; i++) {
    const event = req.body.entry[0].messaging[i];
    const senderId = event.sender.id;

    if (event.message && event.message.text) {
      const text = event.message.text;

      console.log('Message received: ', text);
      sender.sendTextMessage(senderId, `Text received: ${text}`);
    }
  }

  res.sendStatus(200);
});

module.exports = router;
