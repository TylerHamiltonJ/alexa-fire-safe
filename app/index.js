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

// // alexa
// alexaSkill.app.directiveHandlers.push(alexaStates.MetaDataPlayAudioDirective);
// exports.alexa = RavenLambdaWrapper.handler(Raven, alexaSkill.lambda());
// exports.handler = RavenLambdaWrapper.handler(Raven, alexaSkill.lambda());

// // dialogFlow
// const dialogFlowAction = new voxa.DialogFlowPlatform(app);
// dialogFlowStates.register(dialogFlowAction);
// exports.dialogFlow = RavenLambdaWrapper.handler(Raven, dialogFlowAction.lambdaHTTP());
// exports.dialogFlowAction = dialogFlowAction;
