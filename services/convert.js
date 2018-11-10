const conversionTableOz = {
  '1 2/3 oz': '50 ml',
  '1/2 oz': '15 ml',
  '1/3 oz': '10 ml',
  '4 oz': '120 ml',
  '5 oz': '150 ml',
  '6 oz': '175 ml',
  '2 oz': '60 ml',
  '1 oz': '30 ml',
  '12 oz': '350 ml',
  '2 1/2 oz': '75 ml',
};
const conversionTableShots = {
  '1 1/2 oz': '1 shot of',
  '1.5 oz': '1 shot of',
  '3/4 oz': 'half a shot of',
  '0.75 oz': 'half a shot of',
  '3 oz': '2 shots of',
  '8 oz': '1 cup',
  '1/4 oz': '1 teaspoon of',
};


module.exports = {
  ingredient: (ingredient) => {
    if (ingredient === 'Lemon') {
      return 'a Lemon';
    }
    return ingredient;
  },
  unit: (voxaEvent, index) => {
    const m = voxaEvent.model.suggestedDrink[`strMeasure${index + 1}`];
    const t = m.trim();
    try {
      const locale = voxaEvent.request.locale.toLowerCase();
      if (m.includes('oz')) {
        if (conversionTableShots[t]) {
          return conversionTableShots[t];
        }
        if (locale !== 'en-us' && conversionTableOz[t]) {
          return conversionTableOz[t];
        }
        console.log('NO MATCH::::', m);
        return m;
      }
      if (m.includes(' cl')) {
        const int = parseInt(m, 10) * 10;
        return `${int} ml`;
      }
      if (m.includes('1 shot')) {
        return m.replace('1 shot', 'a shot of');
      }
      if (m.includes(' cup')) {
        if (m.includes('1 cup')) {
          return m.replace('1 cup', '1 cup of');
        }
        return m.replace(' cups', ' cups of');
      }
      if (m.includes('1 tsp')) {
        return m.replace('1 tsp', '1 tsp of');
      }
      if (m.includes('1 drop')) {
        return m.replace('drop', 'a drop of');
      }
      if (m.includes('1 tblsp')) {
        return m.replace('tblsp', '1 tablespoon');
      }
      if (m.includes('1 dash')) {
        return m.replace('dash', 'a dash of');
      }
      if (m.includes('1/2')) {
        return m.replace('1/2', 'half a');
      }
      return m;
    } catch (err) {
      console.log(err);
      return m;
    }
  },
};
