const _ = require('lodash');
const moment = require('moment-timezone');
// TODO build variables here

exports.status = voxaEvent => voxaEvent.model.rating.status;
exports.fireBan = voxaEvent => voxaEvent.model.rating.fireBan;
exports.calendarDate = (voxaEvent) => {
  const date = _.get(voxaEvent, 'model.rating.date', moment());
  return moment(date).calendar(moment(), {
    sameDay: '[today]',
    nextDay: '[tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[yesterday]',
    lastWeek: '[last] dddd',
    sameElse: '[for the] DD/MM/YYYY',
  });
};
exports.name = voxaEvent => voxaEvent.model.rating.name;
exports.areaName = voxaEvent => voxaEvent.model.rating.name;
exports.postcode = voxaEvent => voxaEvent.model.postcode;
exports.data = voxaEvent => voxaEvent.model.data;
exports.rating = voxaEvent => voxaEvent.model.rating;
exports.firebanBoth = (voxaEvent) => {
  if (this.fireBan(voxaEvent)) {
    return `There's currently a fire ban for ${this.areaName(voxaEvent)} for ${this.calendarDate(voxaEvent)}. No fires can be lit or be allowed to remain alight in the open air from 12:01 AM until 11:59 PM`;
  }
  return `There's no fire ban for ${this.areaName(voxaEvent)} for ${this.calendarDate(voxaEvent)}, however restrictions may apply`;
};
exports.fireRatingBoth = voxaEvent => `The fire danger rating is ${this.status(voxaEvent)}`;
exports.statusCard = (voxaEvent) => {
  switch (voxaEvent.model.rating.status) {
    case 'LOW-MODERATE':
    case 'HIGH':
    case 'VERY HIGH':
      return `What does it mean?
        - If a fire starts, it can most likely be controlled in these conditions and homes can provide safety.
        - Be aware of how fires can start and minimise the risk.
        - Controlled burning off may occur in these conditions if it is safe - check to see if permits apply.
        
        What should I do?
        - Check your bushfire survival plan.
        - Monitor conditions.
        - Action may be needed.
        - Leave if necessary.`;
    case 'SEVERE':
      return `What does it mean?
    - Expect hot, dry and possibly windy conditions.
    - If a fire starts and takes hold, it may be uncontrollable.
    - Well prepared homes that are actively defended can provide safety. 
    - You must be physically and mentally prepared to defend in these conditions.
    
    What should I do?
    - Well prepared homes that are actively defended can provide safety - check your bushfire survival plan.
    - If you are not prepared, leaving bushfire prone areas early in the day is your safest option.
    - Be aware of local conditions and seek information by listening to your emergency broadcasters, go to cfa.vic.gov.au or call the VicEmergency Hotline on 1800 226 226.`;
    case 'EXTREME':
      return `What does it mean?
    - Expect extremely hot, dry and windy conditions.
    - If a fire starts and takes hold, it will be uncontrollable, unpredictable and fast moving. Spot fires will start, move quickly and come from many directions.
    - Homes that are situated and constructed or modified to withstand a bushfire, that are well prepared and actively defended, may provide safety.
    - You must be physically and mentally prepared to defend in these conditions.
    
    What should I do?
    - Consider staying with your property only if you are prepared to the highest level. This means your home needs to be situated and constructed or modified to withstand a bushfire*, you are well prepared and you can actively defend your home if a fire starts
    - If you are not prepared to the highest level, leaving high risk bushfire areas early in the day is your safest option
    - Be aware of local conditions and seek information by listening to your emergency broadcasters, go to cfa.vic.gov.au or call the VicEmergency Hotline on 1800 226 226`;
    case 'CODE RED':
      return `What does it mean?
    - These are the worst conditions for a bush or grass fire.
    - Homes are not designed or constructed to withstand fires in these conditions
    - The safest place to be is away from high risk bushfire areas
    
    What should I do?
    - Leaving high risk bushfire areas the night before or early in the day is your safest option - do not wait and see.
    - Avoid forested areas, thick bush or long, dry grass

    Know your trigger - make a decision about:
    - when you will leave
    - where you will go
    - how you will get there
    - when you will return
    - what will you do if you cannot leave`;
    default:
      return '';
  }
};
