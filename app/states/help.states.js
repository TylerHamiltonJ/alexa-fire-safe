const speech = require('../speechRandomisers');
const helper = require('../../services/helpers');

exports.register = function register(app) {
  app.onIntent('HelpIntent', (voxaEvent) => {
    if (helper.ageGate(voxaEvent)) {
      return {
        to: 'AgeGateAsk',
      };
    }
    return {
      ask: 'Help.General.ask',
      dialogFlowSuggestions: speech.randomInstructionChip(),
      to: 'entry',
    };
  });
};
