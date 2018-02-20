const { Wit } = require('node-wit');

const config = require('../config/config');

const wit = new Wit({
  accessToken: config.witAccessToken,
});

const getIntent = async message => {
  const mostPropbableIntent = await wit.message(message)
    .then(data => {
      if (data.entities.intent) {
        const mostProbableIntent = data.entities.intent.reduce((prev, current) =>
          (prev.confidence > current.confidence) ? prev : current);

        if (mostProbableIntent.confidence > 0.75) {
          return mostProbableIntent.value;
        } else {
          return null;
        }
      } else {
        return null;
      }
    })
    .catch(console.error);

  return mostPropbableIntent;
};

module.exports.getIntent = getIntent;
