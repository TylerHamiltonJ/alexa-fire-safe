

const _ = require('lodash');
const config = require('../config');
const Voxa = require('voxa');
const voxaGA = require('voxa-ga');
const voxaDashbot = require('voxa-dashbot');
const debug = require('debug')('voxa');
const log = require('lambda-log');

// Array of states to be use in the app
const states = [
  require('./states/drink.states'),
  require('./states/ageGate.states'),
  require('./states/exit.states'),
  require('./states/help.states'),
  require('./states/ingredients.states'),
  require('./states/launch.states'),
  require('./states/randomDrink.states'),
  require('./states/unhandled.states'),
];

function register(app) {
  states.forEach(state => state.register(app));

  app.onRequestStarted(logStart);
  app.onIntentRequest(logIntent);
  app.onAfterStateChanged(logTransition);
  app.onBeforeReplySent(logReply);

  app.onRequestStarted(startTimer);
  app.onBeforeReplySent(clearTimer);

  // Init app handlers
  // app.onRequestStarted(getUserFromDB);
  // app.onRequestStarted(initUser);

  // Error Handler
  app.onError(errorHandler);

  app.onBeforeReplySent(saveLastReply);
  app.onBeforeReplySent(saveLastVisit);

  Voxa.plugins.stateFlow(app);
  Voxa.plugins.replaceIntent(app);

  // Analytics
  // voxaGA(app, config.googleAnalytics);
  // voxaDashbot(app, config.dashbot);

  function startTimer(voxaEvent, reply) {
    const context = voxaEvent.executionContext;
    if (!context.getRemainingTimeInMillis) { return; }
    const timeRemaining = context.getRemainingTimeInMillis();
    voxaEvent.timeoutError = setTimeout(async () => {
      const { user } = voxaEvent.model;
      const replies = {
        ACCOUNT_SUBSCRIBED: 'TimeOut_AuthSub',
        AUTH_FREE: 'TimeOut_AuthFree',
        NO_AUTH: 'TimeOut_Unsubscribed',
      };

      const statement = await voxaEvent.renderer.renderPath(`${replies[user.userType]}.ask`, voxaEvent);
      const reprompt = await voxaEvent.renderer.renderPath(`${replies[user.userType]}.reprompt`, voxaEvent);

      reply.clear();
      reply.addStatement(statement);
      reply.addReprompt(reprompt);

      context.succeed(reply);
    }, Math.max(timeRemaining - 500, 0));
  }

  function clearTimer(voxaEvent) {
    if (voxaEvent.timeoutError) {
      clearTimeout(voxaEvent.timeoutError);
    }
  }

  // async function getUserFromDB(voxaEvent) {
  //   const store = new Storage(config.dynamoDB.tables.users);
  //   const userId = _.get(voxaEvent, 'context.System.user.userId') || voxaEvent.user.userId;
  //   const user = await store.get({ userId });
  //   _.set(voxaEvent, 'model.user', user);
  // }

  // Handler functions
  async function errorHandler(event, err, reply) {
    event.log.error(err);
    const statement = await event.renderer.renderPath('Error.Crash.tell', event);
    reply.clear();
    reply.addStatement(statement);
    reply.terminate();
    return reply;
  }

  function saveLastVisit(voxaEvent) {
    if (voxaEvent.intent.name !== 'ResetIntent') {
      _.set(voxaEvent, 'model.user.lastVisit', voxaEvent.model.nowISO);
    }
  }

  function saveLastReply(request, reply, transition) {
    debug(JSON.stringify(reply, null, 2));
    const directives = _.get(reply, 'msg.directives');

    request.model.reply = _.pickBy({
      say: transition.say,
      to: transition.to.name,
      flow: transition.flow,
    });

    if (transition.dialogFlowMediaResponse) {
      request.model.reply.dialogFlowMediaResponse = transition.dialogFlowMediaResponse;
      request.model.reply.dialogFlowSuggestions = transition.dialogFlowSuggestions;
    }
  }
}

function logIntent(voxaEvent) {
  voxaEvent.log.info('Intent Request', {
    intent: voxaEvent.intent.name,
    params: voxaEvent.intent.params,
  });
}

function logStart(voxaEvent) {
  const debugEnabled = _.includes(process.env.DEBUG, 'voxa');
  voxaEvent.log = new log.LambdaLog({
    requestId: voxaEvent.executionContext.awsRequestId,
    sessionId: voxaEvent.session.id,
  });

  voxaEvent.log.options.debug = debugEnabled;
  voxaEvent.log.options.dev = config.env === 'local';

  const event = _.cloneDeep(voxaEvent.rawEvent);

  voxaEvent.log.info('Got new event', { event });
  voxaEvent.log.debug('DEBUG is enabled');
}

function logReply(voxaEvent, reply) {
  const renderedReply = _.cloneDeep(reply);
  delete renderedReply.sessionAttributes;
  voxaEvent.log.info('Sent reply', { reply: renderedReply });
}

function logTransition(voxaEvent, reply, transition) {
  const clonedTransition = _.cloneDeep(transition);
  voxaEvent.log.info('Transition', { transition: clonedTransition });
}

module.exports.register = register;
