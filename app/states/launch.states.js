const speech = require('../speechRandomisers');
const helper = require('../../services/helpers');

exports.register = function register(app) {
  app.onIntent('LaunchIntent', (voxaEvent) => {
    if (helper.ageGate(voxaEvent)) {
      return {
        to: 'AgeGateAsk',
      };
    }
    return {
      ask: 'Launch.Begin.ask',
      dialogFlowSuggestions: speech.randomInstructionChip(),
      to: 'entry',
    };
  });

  app.onIntent('YesIntent', (voxaEvent) => {
    if (helper.ageGate(voxaEvent)) {
      return {
        to: 'AgeGateAsk',
      };
    }
    return {
      ask: 'Entry.Message.ask',
      dialogFlowSuggestions: speech.randomInstructionChip(),
      to: 'entry',
    };
  });
};
