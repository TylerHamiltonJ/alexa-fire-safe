const helper = require('../services/helpers');


const regions = [
  'Mallee',
  'Wimmera',
  'South West',
  'Northern Country',
  'North Central',
  'Central',
  'North East',
  'West and South Gippsland',
  'East Gippsland'
];

exports.register = function register(skill) {
  skill.onUnhandledState(alexaEvent => {
    // if new session and unhandled intent then just
    // do a launch
    if (alexaEvent.session.new) {
      return {
        to: 'LaunchIntent'
      };
    }

    // Close on negation/cancel/stop intents
    if (['AMAZON.NoIntent', 'AMAZON.CancelIntent', 'AMAZON.StopIntent']
      .includes(alexaEvent.intent.name)) {
      return {
        to: 'End'
      };
    }
    return {
      reply: 'Intent.NotHeard',
      to: 'entry'
    };
  });
  skill.onError((alexaEvent, error) => {
    console.log('\x1b[41m', 'ERROR:::::::: Top Level Error', '\x1b[0m');
    console.error(error);
  }, true);
  skill.onIntent('AMAZON.StopIntent', () => ({
    to: 'End'
  }));
  skill.onIntent('AMAZON.HelpIntent', () => ({
    reply: 'Intent.Help',
    to: 'entry'
  }));
  skill.onIntent('AMAZON.NoIntent', () => ({
    to: 'End'
  }));
  skill.onIntent('AMAZON.CancelIntent', () => ({
    to: 'End'
  }));
  skill.onIntent('LaunchIntent', alexaEvent => {
    return {
      reply: 'Intent.Launch',
      to: 'entry'
    };
  });
  skill.onIntent('FireBanIntent', alexaEvent => {
    alexaEvent.opearlo.ignore();
    const slot = alexaEvent.intent.params;
    console.log(slot)
    const model = alexaEvent.model;
    if (!model.data) {
      return {
        reply: 'Error.API',
        to: 'die'
      }
    }
    if (slot.area || slot.postcode || model.postcode) {
      console.log(slot.postcode)
      const data = helper.findFireBan(slot, model)
      if (data) {
        alexaEvent.model.rating = data;
        if (data.status.includes('NO')) {
          return {
            reply: 'FireBan.None',
            to: 'entry'
          };
        }
        return {
          reply: 'FireBan.Total',
          to: 'entry'
        };
      }
      return {
        reply: 'Intent.Region',
        to: 'BanRegionInput'
      };
    }
    return helper.getPostCode(alexaEvent).then(postcode => {
      if (!postcode) {
        return {
          reply: 'Intent.Region',
          to: 'BanRegionInput'
        };
      }
      model.postcode = postcode;
      return {
        to: 'FireBanIntent'
      };
    });
  });
  skill.onIntent('FireRatingIntent', alexaEvent => {
    if (!alexaEvent.model.data) {
      return {
        reply: 'Error.API',
        to: 'die'
      }
    }
    alexaEvent.opearlo.ignore();
    if (alexaEvent.intent.params.area || alexaEvent.intent.params.postcode || alexaEvent.model.postcode) {
      const res = helper.findFireRating(alexaEvent.intent.params, alexaEvent.model);
      if (res) {
        alexaEvent.model.rating = res;
        const rating = res.status;
        return {
          reply: `Rating.${rating}`,
          to: 'entry'
        };
      }
    }
    return helper.getPostCode(alexaEvent).then(res => {
      if (!res) {
        return {
          reply: 'Intent.Region',
          to: 'RatingRegionInput'
        };
      }
      alexaEvent.model.postcode = res;
      return {
        to: 'FireRatingIntent'
      };
    });
  });


  skill.onState('RatingRegionInput', alexaEvent => {
    alexaEvent.opearlo.ignore();
    const slot = alexaEvent.intent.params;
    const intent = alexaEvent.intent.name;
    if (slot.area || slot.postcode) {
      if (slot.area && !regions.includes(slot.area)) {
        return {
          reply: 'Intent.UnknownRegion',
          to: 'RatingRegionInput'
        };
      }
      return {
        to: 'FireRatingIntent'
      };
    }
    if (
      ['AMAZON.NoIntent', 'AMAZON.CancelIntent', 'AMAZON.StopIntent'].includes(
        intent
      )
    ) {
      return {
        to: 'End'
      };
    }
    if (intent === 'AMAZON.HelpIntent') {
      return {
        reply: 'Intent.Help',
        to: 'entry'
      };
    }
    return {
      reply: 'Intent.Region',
      to: 'RatingRegionInput'
    };
  });
  skill.onState('BanRegionInput', alexaEvent => {
    alexaEvent.opearlo.ignore();
    const slot = alexaEvent.intent.params;
    const intent = alexaEvent.intent.name;
    if (slot.area || slot.postcode) {
      console.log(slot.postcode)
      if (slot.area && !regions.includes(slot.area)) {
        return {
          reply: 'Intent.UnknownRegion',
          to: 'BanRegionInput'
        };
      }
      return {
        to: 'FireBanIntent'
      };
    }
    if (intent === 'AMAZON.HelpIntent') {
      return {
        reply: 'Intent.Help',
        to: 'entry'
      };
    }
    if (
      ['AMAZON.NoIntent', 'AMAZON.CancelIntent', 'AMAZON.StopIntent'].includes(
        intent
      )
    ) {
      return {
        to: 'End'
      };
    }
    return {
      reply: 'Intent.Region',
      to: 'BanRegionInput'
    };
  });
  skill.onState('End', (alexaEvent) => {
    alexaEvent.opearlo.ignore();
    return {
      reply: 'Intent.End',
      to: 'die'
    };
  });
};
