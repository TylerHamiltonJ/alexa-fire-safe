const data = require('../../app_data/data');
const api = require('../../services/api');
const _ = require('lodash');
const speech = require('../speechRandomisers');
const helper = require('../../services/helpers');

// Search drink "What is in a _____"
exports.register = function register(app) {
  app.onIntent('RandomDrinkIntent', (voxaEvent) => {
    if (helper.ageGate(voxaEvent)) {
      return { to: 'AgeGateAsk' };
    }
    return api.randomAPI().then((res) => {
      voxaEvent.model.suggestedDrink = res.drinks[0];
      return {
        ask: 'Drinks.RandomSuggest.ask',
        dialogFlowSuggestions: [speech.yes, speech.no],
        to: 'ShouldMakeRandomDrinkHandler',
      };
    });
  });

  app.onState('ShouldMakeRandomDrinkHandler', (voxaEvent) => {
    const intent = voxaEvent.intent.name;
    if (intent === 'YesIntent') {
      return {
        ask: 'Drinks.Recipe.ask',
        dialogFlowBasicCard: 'Drinks.Recipe.dialogFlowBasicCard',
        dialogFlowSuggestions: speech.randomInstructionChip(),
        to: 'entry',
      };
    }
    if (intent === 'NoIntent') {
      return {
        to: 'RandomDrinkIntent',
      };
    }
    return { to: 'entry' };
  });
};
