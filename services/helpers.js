const unirest = require('unirest');
const ausPost = require('../services/auspostService');
const AlexaDeviceAddressClient = require('../services/AlexaDeviceAddressClient');

const fireData = () =>
  new Promise((resolve, reject) =>
    unirest
    .get('https://data.emergency.vic.gov.au/Show?pageId=getFDRTFBJSON')
    .end(res => (res.ok ? resolve(res.body) : reject(res.error)))
  );

const location = postcode => ausPost.getAreaName(postcode);
module.exports = {
  getPostCode: alexaEvent => new Promise(resolve => {
    if (alexaEvent.context.System.user.permissions) {
      const addressClient = new AlexaDeviceAddressClient(
        alexaEvent.context.System.apiEndpoint,
        alexaEvent.context.System.device.deviceId,
        alexaEvent.context.System.user.permissions.consentToken
      );
      return addressClient
        .getCountryAndPostalCode()
        .then(addressResult =>
          addressResult.address.postalCode
        )
        .catch(() => null);
    }
    return resolve(null);
  }),
  getFireData: () => fireData().then(data => data),
  findFireRating: (slot, model) => {
    if (slot.area) {
      const foundLoation = model.data
        .find(t => !t.status)
        .declareList.find(
          f => f.name.toLowerCase() === slot.area.toLowerCase()
        );
      return foundLoation;
    }
    const postalCode = slot.postcode ? slot.postcode : model.postcode;
    if (postalCode) {
      try {
        const postcode = location(postalCode);
        const foundLoation = model.data
          .find(t => !t.status)
          .declareList.find(f => f.name === postcode);
        return foundLoation;
      } catch (err) {
        //
      }
    }
    return null;
  },
  findFireBan: (slot, model) => {
    if (slot.area) {
      const foundLoation = model.data
        .find(t => t.status)
        .declareList.find(
          f => f.name.toLowerCase() === slot.area.toLowerCase()
        );
      return foundLoation;
    }
    const postalCode = slot.postcode ? slot.postcode : model.postcode;
    console.log(postalCode)
    if (postalCode) {
      try {
        const postcode = location(postalCode);
        console.log(postcode)
        const foundLoation = model.data
          .find(t => t.status)
          .declareList.find(f => f.name === postcode);
        console.log(foundLoation)
        return foundLoation;
      } catch (err) {
        console.log(err)
      }
    }
    return null;
  },
};
