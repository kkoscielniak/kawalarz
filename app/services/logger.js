const bunyan = require('bunyan');
const config = require('../config/config');

const logger = bunyan.createLogger({
  name: config.applicationName,
});

module.exports = logger;
