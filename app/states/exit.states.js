exports.register = function register(app) {
  app.onIntent('NoIntent', () => ({
    to: 'End',
  }));
  app.onIntent('StopIntent', () => ({
    to: 'End',
  }));
  app.onIntent('CancelIntent', () => ({
    to: 'End',
  }));
  app.onState('End', () => ({
    tell: 'End.Message.tell',
    to: 'die',
  }));
};
