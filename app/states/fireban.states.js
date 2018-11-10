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
  app.onIntent('FireBanIntent', (voxaEvent) => {
    const slot = voxaEvent.intent.params;
    const model = voxaEvent.model;
    if (!model.data) {
      return {
        reply: 'Error.API',
        to: 'die',
      };
    }
    if (slot.area || slot.postcode || model.postcode) {
      console.log(slot.postcode);
      const data = helper.findFireBan(slot, model);
      if (data) {
        voxaEvent.model.rating = data;
        if (data.status.includes('NO')) {
          return {
            reply: 'FireBan.None',
            to: 'entry',
          };
        }
        return {
          reply: 'FireBan.Total',
          to: 'entry',
        };
      }
      return {
        reply: 'Intent.Region',
        to: 'BanRegionInput',
      };
    }
    return helper.getPostCode(voxaEvent).then((postcode) => {
      if (!postcode) {
        return {
          reply: 'Intent.Region',
          to: 'BanRegionInput',
        };
      }
      model.postcode = postcode;
      return {
        to: 'FireBanIntent',
      };
    });
  });
  app.onState('BanRegionInput', (voxaEvent) => {
    const slot = voxaEvent.intent.params;
    const intent = voxaEvent.intent.name;
    if (slot.area || slot.postcode) {
      console.log(slot.postcode);
      if (slot.area && !regions.includes(slot.area)) {
        return {
          reply: 'Intent.UnknownRegion',
          to: 'BanRegionInput',
        };
      }
      return {
        to: 'FireBanIntent',
      };
    }
    if (intent === 'AMAZON.HelpIntent') {
      return {
        reply: 'Intent.Help',
        to: 'entry',
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
    return {
      reply: 'Intent.Region',
      to: 'BanRegionInput',
    };
  });
};
