const helper = require('../services/helpers');
const api = require('../services/api');

const convertIngredients = voxaEvent => Object.keys(voxaEvent.model.suggestedDrink)
  .filter(i => i.includes('strIngredient') && voxaEvent.model.suggestedDrink[i])
  .map(
    (m, index) =>
    `${helper.convertUnit(voxaEvent, index)} ${helper.convertIngredient(voxaEvent.model.suggestedDrink[m])}`,
  );


for (let i = 0; i < 50; i += 1) {
  api.randomAPI().then((res) => {
    const voxaEvent = {
      request: {
        locale: 'en-au',
      },
      model: {
        suggestedDrink: res.drinks[0],
      },
    };
    convertIngredients(voxaEvent);
  });
}
