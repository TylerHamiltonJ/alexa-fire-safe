// API calls here

const unirest = require('unirest');

const URLprefix = 'http://www.thecocktaildb.com/api/json/v1/4233/';
const api = url => new Promise((resolve, reject) =>
  unirest
  .get(url)
  .end(res => (res.ok ? resolve(res.body) : reject(res.error))),
);

module.exports = {
  drinkAPI: drinkName => api(`${URLprefix}search.php?s=${drinkName}`),
  getFullCocktail: id => api(`${URLprefix}/lookup.php?i=${id}`),
  getDrinksByIngredient: ingredientName => api(`${URLprefix}filter.php?i=${ingredientName}`),
  randomAPI: () => api(`${URLprefix}random.php`),
};
