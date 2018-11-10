const helper = require('../../services/helpers');

const regions = [
  'Mallee',
  'Wimmera',
  'South West',
  'Northern Country',
  'North Central',
  'Central',
  'North East',
  'West and South Gippsland',
  'East Gippsland',
];

exports.register = function register(app) {
  app.onIntent('FireRatingIntent', (voxaEvent) => {
    if (!voxaEvent.model.data) {
      return {
        reply: 'Error.API',
        to: 'die',
      };
    }
    if (voxaEvent.intent.params.area ||
      voxaEvent.intent.params.postcode ||
      voxaEvent.model.postcode) {
      const res = helper.findFireRating(voxaEvent.intent.params, voxaEvent.model);
      if (res) {
        voxaEvent.model.rating = res;
        const rating = res.status;
        return {
          reply: `Rating.${rating}`,
          to: 'entry',
        };
      }
    }
    return helper.getPostCode(voxaEvent).then((res) => {
      if (!res) {
        return {
          reply: 'Intent.Region',
          to: 'RatingRegionInput',
        };
      }
      voxaEvent.model.postcode = res;
      return {
        to: 'FireRatingIntent',
      };
    });
  });


  app.onState('RatingRegionInput', (voxaEvent) => {
    const slot = voxaEvent.intent.params;
    const intent = voxaEvent.intent.name;
    if (slot.area || slot.postcode) {
      if (slot.area && !regions.includes(slot.area)) {
        return {
          reply: 'Intent.UnknownRegion',
          to: 'RatingRegionInput',
        };
      }
      return {
        to: 'FireRatingIntent',
      };
    }
    if (
      ['AMAZON.NoIntent', 'AMAZON.CancelIntent', 'AMAZON.StopIntent'].includes(
        intent,
      )
    ) {
      return {
        to: 'End',
      };
    }
    if (intent === 'AMAZON.HelpIntent') {
      return {
        reply: 'Intent.Help',
        to: 'entry',
      };
    }
    return {
      reply: 'Intent.Region',
      to: 'RatingRegionInput',
    };
  });
};
