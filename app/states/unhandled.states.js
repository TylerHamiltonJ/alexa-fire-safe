exports.register = function register(skill) {
  skill.onUnhandledState((alexaEvent) => {
    // if new session and unhandled intent then just
    // do a launch
    if (alexaEvent.session.new) {
      return {
        to: 'LaunchIntent',
      };
    }

    // Close on negation/cancel/stop intents
    if (['AMAZON.NoIntent', 'AMAZON.CancelIntent', 'AMAZON.StopIntent']
      .includes(alexaEvent.intent.name)) {
      return {
        to: 'End',
      };
    }
    return {
      reply: 'Intent.NotHeard',
      to: 'entry',
    };
  });
};
