const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const logger = require('./services/logger');
const messenger = require('./messenger/messenger');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello world, I am a chat bot');
});

app.get('/webhook/', function(req, res) {
  // if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
  //   res.send(req.query['hub.challenge'])
  // }
  // res.send('Error, wrong token');

  logger.info('Webhook reached', req, res);

  const messagingEvents = req.body.entry[0].messaging;
  for (let i = 0; i < messagingEvents.length; i++) {
    const event = req.body.entry[0].messaging[i];
    const sender = event.sender.id;
    if (event.message && event.message.text) {
      const text = event.message.text;
      messenger.sendTextMessage(sender, `Text received: ${text}`);
    }
  }

  res.sendStatus(200);
});


app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});
