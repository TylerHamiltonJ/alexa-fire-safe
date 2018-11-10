const ranArr = arr => arr[Math.floor(Math.random() * arr.length)];
const suggestedIngredients = require('../content/en-US/suggested-ingredients');
const suggestedDrinks = require('../content/en-US/suggested-drinks');
const _ = require('lodash');

module.exports = {
  yes: ranArr(['Yes', 'Yep!', 'Sure', 'Sounds good']),
  no: ranArr(['Yuck', 'Nope', 'No', 'No way']),
  randomInstruction: () => {
    const i = Math.random();
    if (i < 0.33) {
      const drinks = suggestedDrinks.map(m => m.drinkName);
      const shuffle = _.shuffle(drinks);
      return `What's in a ${shuffle[0]}`;
    }
    const ingredients = suggestedIngredients.map(m => m.ingredientName);
    const shuffle = _.shuffle(ingredients);
    if (i < 0.66) {
      return `What can I make with ${shuffle[0]} and ${shuffle[1]}`;
    }
    return `What can I make with ${shuffle[0]}`;
  },
  randomInstructionChip: () => {
    const drinks = suggestedDrinks.map(m => m.drinkName);
    const ingredients = suggestedIngredients
      .map(m => m.ingredientName)
      .filter(f => f.length < 14);
    const arr = [
      `${_.shuffle(drinks)[0]} 🍸`,
      `Drink with ${_.shuffle(ingredients)[0]}‍`,
      'Random Drink 🔀',
    ];
    return _.shuffle(arr);
  },
};
