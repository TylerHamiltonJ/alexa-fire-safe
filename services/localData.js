const _ = require('lodash');
const helper = require('./helpers');
const AlexaDeviceAddressClient = require('./AlexaDeviceAddressClient');
const reverseGeocode = require('latlng-to-zip');

module.exports = {
  savePostcode: async (voxaEvent) => {
    const location = _.get(voxaEvent, 'google.conv.device.location');
    const address = _.get(location, 'formattedAddress');
    if (!location) {
      return false;
    }
    console.log('=================');
    console.log(location, address);
    console.log('=================');
    if (!address && location.coordinates) {
      const lat = _.get(location, 'coordinates.latitude');
      const lon = _.get(location, 'coordinates.longitude');
      console.log(lat, lon);
      if (lat && lon) {
        const postcode = await reverseGeocode({
          lat,
          lon,
        }).catch(err => console.log(err));
        console.log(postcode);
      }
      return false;
    }
    const postcode = address.match(/[0-9]{4},/g)[0].replace(',', '');
    _.set(voxaEvent, 'google.conv.user.storage.postcode', postcode);
    voxaEvent.model.postcode = postcode;
    return true;
  },
  getPostcode: voxaEvent => new Promise((resolve) => {
    if (helper.platformName(voxaEvent) === 'dialogflow') {
      const postcode = _.get(voxaEvent, 'google.conv.user.storage.postcode');
      if (!postcode) {
        return resolve(false);
      }
      voxaEvent.model.postcode = postcode;
      return resolve(true);
    }
    if (!_.get(voxaEvent, 'context.System.user.permissions')) {
      return resolve(null);
    }
    const addressClient = new AlexaDeviceAddressClient(
      voxaEvent.context.System.apiEndpoint,
      voxaEvent.context.System.device.deviceId,
      voxaEvent.context.System.user.permissions.consentToken,
    );
    return addressClient
      .getCountryAndPostalCode()
      .then((addressResult) => {
        voxaEvent.model.postcode = addressResult.address.postalCode;
      })
      .catch(() => null);
  }),
};
