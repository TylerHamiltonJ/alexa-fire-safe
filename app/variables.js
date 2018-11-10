const helper = require('../services/helpers');
const speech = require('./speechRandomisers');
const {
  Image,
} = require('actions-on-google');
const _ = require('lodash');

exports.drinkName = (voxaEvent) => {
  if (voxaEvent.model.suggestedDrink) {
    return helper.checkVowel(voxaEvent.model.suggestedDrink.strDrink);
  }
  return helper.checkVowel(voxaEvent.model.drinksList[voxaEvent.model.suggestCount].strDrink);
};
exports.interjectYum = () => {
  if (Math.floor(Math.random() * 100) === 50) {
    return '<say-as interpret-as="interjection">yum</say-as>!';
  }
  return '';
};
exports.instructions = voxaEvent =>
  voxaEvent.model.suggestedDrink.strInstructions
  .replace('1.', 'First,')
  .replace('2.', '. Then,')
  .replace('3.', '. Then,')
  .replace('4.', '. Then,');

exports.ingredients = (voxaEvent) => {
  const ingredients = Object.keys(voxaEvent.model.suggestedDrink)
    .filter(i => i.includes('strIngredient') && voxaEvent.model.suggestedDrink[i])
    .map(
      (m, index) =>
      `${helper.convertUnit(voxaEvent, index)} ${helper.convertIngredient(voxaEvent.model.suggestedDrink[m])}`,
    );
  return helper.createSentence(ingredients);
};

exports.userIngredients = (voxaEvent) => {
  const ingredientSlotNames = Object.keys(voxaEvent.intent.params).filter(f => voxaEvent.intent.params[f]);
  const ingedientSlots = ingredientSlotNames.map(m => voxaEvent.intent.params[m]);
  return helper.createSentence(ingedientSlots);
};

exports.ingredientsCard = (voxaEvent) => {
  const ingredients = Object.keys(voxaEvent.model.suggestedDrink)
    .filter(i => i.includes('strIngredient') && voxaEvent.model.suggestedDrink[i])
    .map(
      (m, index) =>
      `${helper.convertUnit(voxaEvent, index)} ${helper.convertIngredient(voxaEvent.model.suggestedDrink[m])}`,
    );
  return ingredients.join('\n  \n');
};

exports.ingredientName = voxaEvent => voxaEvent.model.ingredientName;
exports.suggestedIngredient = voxaEvent => voxaEvent.model.suggestedDrink.strIngredient1;
exports.drinksList = voxaEvent => voxaEvent.model.drinksList;
exports.suggestCount = voxaEvent => voxaEvent.model.suggestCount;
exports.drinkSlot = (voxaEvent) => {
  if (!voxaEvent.intent.params.drinkName) {
    return 'that';
  }
  return `a ${voxaEvent.intent.params.drinkName}`;
};

exports.glassType = (voxaEvent) => {
  if (voxaEvent.model.suggestedDrink.strGlass) {
    return `This drink is served in ${helper.checkVowel(
      voxaEvent.model.suggestedDrink.strGlass,
    )}.`;
  }
  return '';
};

exports.welcomeInstruction = () => `Try asking: ${speech.randomInstruction()}`;

exports.dialogflowCardInstructions = voxaEvent => ({
  text: this.ingredientsCard(voxaEvent),
  subtitle: this.instructions(voxaEvent),
  title: voxaEvent.model.suggestedDrink.strDrink,
  image: new Image({
    url: voxaEvent.model.suggestedDrink.strDrinkThumb,
    alt: `${voxaEvent.model.suggestedDrink.strDrink} image`,
  }),
});


exports.drinkingAge = (voxaEvent) => {
  const locale = _.get(voxaEvent, 'request.locale', 'en-us');
  switch (locale.toLowerCase()) {
    case 'en-au':
      return '18';
    case 'en-sg':
      return '18';
    case 'en-ca':
      return '19';
    case 'en-gb':
      return '18';
    default:
      return '21';
  }
};
