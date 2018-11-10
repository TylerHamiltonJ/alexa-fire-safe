// Include the state machine module and the replyWith function
const Voxa = require('voxa');
const views = require('./views');
const variables = require('./variables');
const states = require('./states');
const helper = require('../services/helpers');
const voxaOpearlo = require('voxa-opearlo');

const opearloConfig = {
  userId: '20DGCIYZ6QRxsJMnAogzhbuoaGo1',
  appName: 'firesafe',
  apiKey: '2jrbclC7eN5mE7sGKuA8449U7f37Vr9j1aIkpEVr',
  suppressSending: false, // A flag to supress sending hits. Useful while developing on the skill
};

const skill = new Voxa({
  variables,
  views
});
skill.onError((alexaEvent, error) => {
  console.log(error, JSON.stringify(error));
  const reply = new Voxa.Reply(alexaEvent, {
    tell: 'There was a problem accessing fire data. Please try again later.',
  });
  return reply;
});

function logJourney(alexaEvent) {
  console.log(
    '\x1b[35m%s\x1b[0m',
    `State:  ${alexaEvent.session.attributes.state}\nIntent: ${
      alexaEvent.intent.name
    }\nSlot: ${JSON.stringify(alexaEvent.intent.params)}`
  );
}
states.register(skill);
skill.onSessionStarted(
  alexaEvent =>
  new Promise(resolve =>
    helper.getFireData().then(res => {
      alexaEvent.model.data = res.results;
      return resolve();
    }).catch(err => resolve(err))
  ));

skill.onBeforeStateChanged(logJourney);
voxaOpearlo(skill, opearloConfig);
module.exports = skill;
