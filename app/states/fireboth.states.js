const helper = require('../../services/helpers');
const regions = require('../../app_data/regions');

exports.register = function register(app) {
  app.onIntent('FireDangerAndRatingIntent', (voxaEvent) => {
    if (!voxaEvent.model.data) {
      return {
        tell: 'Error.API.tell',
        to: 'die',
      };
    }
    if (helper.platformName(voxaEvent) === 'dialogflow'
    && !voxaEvent.model.postcode) {
      return {
        dialogFlowPermission: {
          context: 'To find the fire ban status of your area',
          permissions: 'DEVICE_PRECISE_LOCATION',
        },
      };
    }
    if (!helper.areaKnown(voxaEvent)) {
      return {
        ask: 'Input.Postcode.ask',
        to: 'FireDangerAndRatingInput',
      };
    }
    voxaEvent.model.rating = helper.getDataForArea(voxaEvent);
    if (voxaEvent.model.rating.error) {
      return {
        ask: 'Error.Invalid.ask',
        to: 'entry',
      };
    }
    if (!voxaEvent.model.rating) {
      return {
        tell: 'Error.API.tell',
        to: 'die',
      };
    }
    return {
      tell: 'Fire.Both.tell',
      to: 'die',
    };
  });


  app.onState('FireDangerAndRatingInput', (voxaEvent) => {
    if (!voxaEvent.intent.params.area &&
      !voxaEvent.intent.params.postcode) {
      return {
        to: 'entry',
      };
    }
    if (voxaEvent.intent.params.area &&
      !regions.includes(voxaEvent.intent.params.area)) {
      return {
        ask: 'Input.UnknownRegion.ask',
        to: 'FireDangerAndRatingInput',
      };
    }
    return {
      to: 'FireDangerAndRatingIntent',
    };
  });
};
