const _ = require('lodash');
const papa = require('papaparse');
const fs = require('fs');
const path = require('path');

class AuspostService {
  constructor() {
    const csvFilePath = path.join(__dirname, '../app_data/postcode.csv');
    const csvFile = fs.readFileSync(csvFilePath).toString('utf8');

    this.$postcodeData = {};

    papa.parse(csvFile, {
      header: true,
      complete: results =>
        results.data.map(e => {
          const postcode = _.padStart(`${e.postcode}`, 4, '0');
          if (this.$postcodeData[postcode]) {
            // post code is already in the dictionary
            return e;
          }

          this.$postcodeData[postcode] = e;
          return e;
        })
    });
  }

  // TODO : Add check to see if postcode exists
  getAreaName(postcode) {
    const postcodeElement = this.$postcodeData[
      _.padStart(`${postcode}`, 4, '0')
    ];
    return postcodeElement.BOM;
  }
  getGeoLocation(postcode) {
    const postcodeElement = this.$postcodeData[
      _.padStart(`${postcode}`, 4, '0')
    ];
    return {
      lon: postcodeElement.lon,
      lat: postcodeElement.lat
    };
  }
  getPostcode(areaName) {
    const postcodeElement = this.$postcodeData[_.padStart(areaName, 40, '1')];
    return postcodeElement.postcode;
  }
}

const auspost = new AuspostService();

module.exports = auspost;
