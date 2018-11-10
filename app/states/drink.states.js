const helper = require('../../services/helpers');
const api = require('../../services/api');
const speech = require('../speechRandomisers');

// Search drink "What is in a _____"
exports.register = function register(app) {
  app.onIntent('IngredientOnlyIntent', () => ({
    to: 'SearchByIngredientIntent',
  }));
  app.onIntent('IngredientIntent', () => ({
    to: 'SearchByIngredientIntent',
  }));
  app.onIntent('SearchByIngredientIntent', (voxaEvent) => {
    if (helper.ageGate(voxaEvent)) {
      return { to: 'AgeGateAsk' };
    }
    voxaEvent.model.suggestCount = 0;
    voxaEvent.model.ingredients = helper.mapIngredients(voxaEvent.intent.params);
    return helper.largeList(voxaEvent.intent.params).then((res) => {
      voxaEvent.model.drinksList =
        voxaEvent.model.ingredients.length > 1 ? helper.findDuplicates(res) : res;
      if (voxaEvent.model.drinksList.length < 1) {
        return {
          ask: 'Drinks.CantMake.ask',
          dialogFlowSuggestions: speech.randomInstructionChip(),
          to: 'entry',
        };
      }
      return {
        to: 'GetDrinkState',
      };
    });
  });
  app.onState('GetDrinkState', (voxaEvent) => {
    const model = voxaEvent.model;
    if (
      model.drinksList[model.suggestCount] &&
      model.drinksList[model.suggestCount].idDrink
    ) {
      return api.getFullCocktail(model.drinksList[model.suggestCount].idDrink)
        .then((res) => {
          if (res.drinks[0]) {
            voxaEvent.model.suggestedDrink = res.drinks[0];
            return {
              ask: 'Drinks.Suggest.ask',
              dialogFlowSuggestions: [speech.yes, speech.no],
              to: 'ShouldMakeSuggestDrinkHandler',
            };
          }
          return {
            ask: 'Ingredient.Unknown.ask',
            dialogFlowSuggestions: speech.randomInstructionChip(),
            to: 'entry',
          };
        })
        .catch(err => console.log(err));
    }
    return {
      ask: 'Drinks.NoMore.ask',
      dialogFlowSuggestions: speech.randomInstructionChip(),
      to: 'entry',
    };
  });

  app.onState('ShouldMakeSuggestDrinkHandler', (voxaEvent) => {
    const intent = voxaEvent.intent.name;
    if (intent === 'YesIntent') {
      return {
        ask: 'Drinks.Recipe.ask',
        dialogFlowSuggestions: speech.randomInstructionChip(),
        dialogFlowBasicCard: 'Drinks.Recipe.dialogFlowBasicCard',
        to: 'entry',
      };
    }
    if (intent === 'NoIntent') {
      voxaEvent.model.suggestCount += 1;
      return {
        to: 'GetDrinkState',
      };
    }
    return {
      to: 'entry',
    };
  });

  app.onState('InputNewDrink', (voxaEvent) => {
    if (voxaEvent.intent.params.drinkName) {
      return {
        to: voxaEvent.model.lastState,
      };
    }
    if (voxaEvent.intent.name === 'YesIntent') {
      return {
        ask: 'Drinks.AskWhichDrink.ask',
        dialogFlowSuggestions: speech.randomInstructionChip(),
        to: 'InputNewDrink',
      };
    }
    return {
      to: 'entry',
    };
  });
  app.onIntent('HowToMakeDrinkIntent', (voxaEvent) => {
    if (helper.ageGate(voxaEvent)) {
      return { to: 'AgeGateAsk' };
    }
    const drinkName = helper.fuzzyMatchDrink(voxaEvent.intent.params.drinkName);
    if (!drinkName) {
      voxaEvent.model.lastState = 'HowToMakeDrinkIntent';
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
          ask: 'Drinks.Instructions.ask',
          dialogFlowBasicCard: 'Drinks.Instructions.dialogFlowBasicCard',
          dialogFlowSuggestions: speech.randomInstructionChip(),
          to: 'entry',
        };
      }
      voxaEvent.model.lastState = 'HowToMakeDrinkIntent';
      return {
        ask: 'Drinks.NotFound.ask',
        dialogFlowSuggestions: speech.randomInstructionChip(),
        to: 'InputNewDrink',
      };
    });
  });
};
