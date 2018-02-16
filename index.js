const express = require('express');
const bodyParser = require('body-parser');

const messengerRoutes = require('./app/routes/messengerRoutes');

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', messengerRoutes);

app.listen(app.get('port'), function() {
  console.log('Magic happens on port', app.get('port'));
});
