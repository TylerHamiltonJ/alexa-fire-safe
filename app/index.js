const voxa = require('voxa');
const Model = require('./model');
const variables = require('./variables');
const views = require('./views');

// Include the state machine module, the state machine,
// the responses and variables to be used in this skill
const main = require('./main');

const app = new voxa.VoxaApp({ variables, views, Model });
main.register(app);

// Alexa Skill
const alexaSkill = new voxa.AlexaPlatform(app);
exports.alexa = alexaSkill.lambda();
exports.alexaSkill = alexaSkill;

// Google Action (Dialogflow)
const dialogFlowAction = new voxa.DialogFlowPlatform(app);
exports.dialogFlow = dialogFlowAction.lambdaHTTP();
exports.dialogFlowAction = dialogFlowAction;
