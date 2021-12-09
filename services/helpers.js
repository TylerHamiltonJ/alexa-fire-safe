const unirest = require('unirest');
const ausPost = require('../services/auspostService');
const _ = require('lodash');
const moment = require('moment-timezone');

const fireData = () =>
  new Promise((resolve, reject) =>
    unirest
    .get('https://data.emergency.vic.gov.au/Show?pageId=getFDRTFBJSON')
    .end(res => (res.ok ? resolve(res.body) : reject(res.error))),
  );

const location = postcode => ausPost.getAreaName(postcode);
const getArea = (voxaEvent) => {
  if (voxaEvent.model.area) {
    return voxaEvent.model.area;
  }
  if (voxaEvent.model.postcode) {
    return location(voxaEvent.model.postcode);
  }
  if (voxaEvent.intent.params.postcode) {
    return location(voxaEvent.intent.params.postcode);
  }
  if (voxaEvent.intent.params.area) {
    return voxaEvent.intent.params.area;
  }
  return null;
};

const getDataForArea = (data, area, date) => {
  console.log(data);
  console.log(area);
  console.log(date);
  const getDate = (d) => {
    if (d) {
      return moment(d).format('DD/MM/YYYY');
    }
    return moment().tz('Australia/Melbourne').format('DD/MM/YYYY');
  };
  const t = getDate(date);
  const filteredData = data.filter(f => f.issueFor === t)
    .map(m => m.declareList
      .filter(a => a.name.toLowerCase() === area.toLowerCase()))
      .map(m => m[0].status);
  if (!filteredData[0]) {
    return { error: 'No Data' };
  }
  return {
    fireban: !filteredData[0].includes('NO'),
    status: filteredData[1],
    name: area,
    date,
  };
};
module.exports = {
  areaKnown: (voxaEvent) => {
    if (!voxaEvent.model.area &&
      !voxaEvent.model.postcode &&
      !voxaEvent.intent.params.postcode &&
      !voxaEvent.intent.params.area) {
      return false;
    }
    return true;
  },
  platformName: voxaEvent => _.get(voxaEvent, 'platform.name', 'alexa'),
  getFireData: () => fireData(),
  endIntents: voxaEvent => ['StopIntent', 'NoIntent', 'CancelIntent'].includes(voxaEvent.intent.name),
  findFireRating: voxaEvent => getDataForArea(voxaEvent, 'firerating'),
  getDataForArea: (voxaEvent) => {
    const data = _.get(voxaEvent, 'model.data');
    const area = getArea(voxaEvent);
    const date = _.get(voxaEvent, 'intent.params.date');
    return getDataForArea(data, area, date);
  },
};
