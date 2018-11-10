const speech = require('../speechRandomisers');

exports.register = function register(skill) {
  skill.onUnhandledState((voxaEvent) => {
    // if new session and unhandled intent then just
    // do a launch
    console.log('\x1b[33m%s\x1b[0m', JSON.stringify(voxaEvent.intent.name));
    if (voxaEvent.session.new) {
      return {
        to: 'LaunchIntent',
      };
    }
    const flow = voxaEvent.session.attributes.flow;
    if (flow[flow.length - 1] === flow[flow.length - 2]) {
      return {
        tell: 'Error.UnknownIntentEnd.tell',
        to: 'die',
      };
    }
    return {
      ask: 'Error.UnknownIntent.ask',
      dialogFlowSuggestions: speech.randomInstructionChip(),
      to: 'entry',
    };
    // return {
    //   to: voxaEvent.session.attributes.reply.to,
    //   ask: _.uniq(
    //     _.concat(
    //       'Error.UnknownIntent.ask',
    //       voxaEvent.session.attributes.reply.reply,
    //     ),
    //   ),
    // };
  });
};
