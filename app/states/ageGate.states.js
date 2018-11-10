const speech = require('../speechRandomisers');
const helper = require('../../services/helpers');

exports.register = function register(app) {
  app.onState('AgeGateAsk', () => ({
    ask: 'AgeGate.Ask.ask',
    dialogFlowSuggestions: ['Yes', 'No'],
    to: 'AgeGateHandler',
  }));

  app.onState('AgeGateHandler', (voxaEvent) => {
    if (voxaEvent.intent.name === 'YesIntent') {
      helper.setLegalAge(voxaEvent);
      return {
        say: 'AgeGate.Confirm.say',
        to: 'LaunchIntent',
      };
    }
    return {
      tell: 'AgeGate.Deny.tell',
      to: 'die',
    };
  });
};
