const express = require('express');
const bodyParser = require('body-parser');

const messenger = require('./messenger/messenger');

const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world, I am a chat bot');
});

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === 'challenge_token') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong token');
});

app.post('/webhook', function(req, res) {
  const messagingEvents = req.body.entry[0].messaging;

  for (let i = 0; i < messagingEvents.length; i++) {
    const event = req.body.entry[0].messaging[i];
    const sender = event.sender.id;

    if (event.message && event.message.text) {
      const text = event.message.text;

      console.log('Message received: ', text);
      messenger.sendTextMessage(sender, `Text received: ${text}`);
    }
  }

  res.sendStatus(200);
});


app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});
