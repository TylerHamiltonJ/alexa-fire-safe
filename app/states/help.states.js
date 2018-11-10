exports.register = function register(app) {
  app.onIntent('HelpIntent', () => ({
    reply: 'Intent.Help',
    to: 'entry',
  }));
};
