const helper = require('../../services/helpers');
const regions = require('../../app_data/regions');

exports.register = function register(app) {
  app.onIntent('FireBanIntent', (voxaEvent) => {
    if (!voxaEvent.model.data) {
      return {
        tell: 'Error.API.tell',
        to: 'die',
      };
    }
    if (helper.platformName(voxaEvent) !== 'dialogflow'
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
        to: 'BanRegionInput',
      };
    }
    voxaEvent.model.rating = helper.getDataForArea(voxaEvent);
    console.log(voxaEvent.model.rating);
    if (voxaEvent.model.rating.error) {
      return {
        ask: 'Error.Invalid.ask',
        to: 'entry',
      };
    }
    if (!voxaEvent.model.rating) {
      return {
        ask: 'Intent.Region.ask',
        to: 'BanRegionInput',
      };
    }
    if (voxaEvent.model.rating.fireban) {
      return {
        ask: 'FireBan.Total.ask',
        to: 'entry',
      };
    }
    return {
      ask: 'FireBan.None.ask',
      to: 'entry',
    };
  });
  app.onState('BanRegionInput', (voxaEvent) => {
    const slot = voxaEvent.intent.params;
    if (!slot.area && !slot.postcode) {
      return {
        to: 'entry',
      };
    }
    if (slot.area && !regions.includes(slot.area)) {
      return {
        ask: 'Input.UnknownRegion.ask',
        to: 'BanRegionInput',
      };
    }
    return {
      to: 'FireBanIntent',
    };
  });
};
