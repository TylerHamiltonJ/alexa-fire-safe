const helper = require('../../services/helpers');
const api = require('../../services/api');
const speech = require('../speechRandomisers');

exports.register = function register(app) {
  app.onIntent('DrinkNameOnlyIntent', () => ({
    to: 'IngredientsInDrinkIntent',
  }));
  app.onIntent('DrinkNameIntent', () => ({
    to: 'IngredientsInDrinkIntent',
  }));
  app.onIntent('IngredientsInDrinkIntent', (voxaEvent) => {
    if (helper.ageGate(voxaEvent)) {
      return { to: 'AgeGateAsk' };
    }
    const drinkName = helper.fuzzyMatchDrink(voxaEvent.intent.params.drinkName);
    if (!drinkName) {
      voxaEvent.model.lastState = 'IngredientsInDrinkIntent';
      return {
        ask: 'Drinks.NotFound.ask',
        dialogFlowSuggestions: speech.randomInstructionChip(),
        to: 'InputNewDrink',
      };
    }
    return api.drinkAPI(drinkName).then((res) => {
      if (res.drinks) {
        voxaEvent.model.suggestedDrink = res.drinks[0];
        return {
          ask: 'Drinks.Ingredients.ask',
          dialogFlowSuggestions: [speech.yes, speech.no],
          to: 'ShouldMakeIngredientDrinkHandler',
        };
      }
      voxaEvent.model.lastState = 'IngredientsInDrinkIntent';
      return {
        ask: 'Drinks.NotFound.ask',
        dialogFlowSuggestions: speech.randomInstructionChip(),
        to: 'InputNewDrink',
      };
    });
  });
  app.onState('ShouldMakeIngredientDrinkHandler', (voxaEvent) => {
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
      voxaEvent.model.lastState = 'HowToMakeDrinkIntent';
      return {
        ask: 'Drinks.ChooseOther.ask',
        dialogFlowSuggestions: speech.randomInstructionChip(),
        to: 'InputNewDrink',
      };
    }
    return {
      to: 'entry',
    };
  });
};
