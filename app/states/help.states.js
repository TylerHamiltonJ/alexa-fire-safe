exports.register = function register(app) {
  app.onIntent('HelpIntent', () => ({
    ask: 'Intent.Help.ask',
    to: 'entry',
  }));
};
