const speech = require('../speechRandomisers');
const helper = require('../../services/helpers');

exports.register = function register(app) {
  app.onIntent('LaunchIntent', voxaEvent => {
    return {
      reply: 'Intent.Launch',
      to: 'entry'
    };
  });
};
