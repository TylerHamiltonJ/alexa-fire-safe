const localData = require('../../services/localData');
const helper = require('../../services/helpers');

exports.register = function register(app) {
  app.onIntent('LaunchIntent', (voxaEvent) => {
    if (helper.platformName(voxaEvent) === 'dialogflow' &&
      !voxaEvent.model.postcode) {
      return {
        dialogFlowPermission: {
          context: 'To find the fire ban status of your area',
          permissions: 'DEVICE_PRECISE_LOCATION',
        },
      };
    }
    return {
      to: 'FireDangerAndRatingIntent',
    };
  });

  app.onIntent('actionsPermissionIntent', (voxaEvent) => {
    localData.savePostcode(voxaEvent);
    if (!voxaEvent.model.postcode) {
      return {
        ask: 'Input.PostcodeReason',
        to: 'FireDangerAndRatingInput',
      };
    }
    return {
      to: 'FireDangerAndRatingIntent',
    };
  });
};
