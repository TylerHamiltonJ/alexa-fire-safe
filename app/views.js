const screen = require('./screens');

const views = {
  Intent: {
    Launch: {
      ask: 'Welcome to Fire Safe. I can tell you the fire safety rating or the fire ban status of your area. What would you like to do?',
      reprompt: 'What would you like to do?',
    },
    End: {
      tell: 'Thanks for using fire safe!',
    },
    NotHeard: {
      ask: "Sorry, I didn't understand. Can you please tell me again?",
      reprompt: 'Can you please tell me again?',
    },
    Region: {
      ask: "For which region? You can tell me your postcode, or your region's name. Which region?",
      reprompt: 'Which region?',
    },
    UnknownRegion: {
      ask: "I'm don't know that region. You can tell me your postcode, or your region's name. Which region?",
      reprompt: 'Which region?',
    },
    Help: {
      ask: `To find out the fire rating, you can ask "What is the fire danger rating" and include your region name or postcode.
        To find out if there is a fire ban, you can ask "Is there a fire ban today?" and include your region name or postcode.
        What would you like to do?`,
      reprompt: 'What would you like to do?',
    },
  },
  Input: {
    Postcode: {
      ask: 'For which postcode?',
      reprompt: 'Which postcode?',
    },
    PostcodeReason: {
      ask: "That's fine, you can tell me your postcode instead. If you don't wish to provide this, just say stop. What is your postcode?",
      reprompt: 'What is your postcode?',
    },
    UnknownRegion: {
      ask: "I'm sorry, Fire Safe currently only knows information from Victoria. What is your postcode?",
      reprompt: 'Which postcode?',
    },
  },
  Fire: {
    Both: {
      tell: '{firebanBoth}. {fireRatingBoth}.',
    },
  },
  Rating: {
    'LOW-MODERATE': {
      ask: 'The fire rating for the {name} region {calendarDate} is {status}. If a fire starts, it can most likely be controlled in these conditions and homes can provide safety. What else can I do for you?',
      reprompt: 'What else can I do for you?',
      card: {
        type: 'Standard',
        title: 'Fire Danger for {name} - {status}',
        text: '{statusCard}',
      },
    },
    HIGH: {
      ask: 'The fire rating for the {name} region {calendarDate} is {status}. If a fire starts, it can most likely be controlled in these conditions and homes can provide safety. What else can I do for you?',
      reprompt: 'What else can I do for you?',
      card: {
        type: 'Standard',
        title: 'Fire Danger for {name} - {status}',
        text: '{statusCard}',
      },
    },
    'VERY HIGH': {
      ask: 'The fire rating for the {name} region {calendarDate} is {status}. If a fire starts, it can most likely be controlled in these conditions and homes can provide safety. What else can I do for you?',
      reprompt: 'What else can I do for you?',
      card: {
        type: 'Standard',
        title: 'Fire Danger for {name} - {status}',
        text: '{statusCard}',
      },
    },
    SEVERE: {
      ask: 'The fire rating for the {name} region {calendarDate} is {status}. Expect hot, dry and possibly windy conditions. What else can I do for you?',
      reprompt: 'What else can I do for you?',
      card: {
        type: 'Standard',
        title: 'Fire Danger for {name} - {status}',
        text: '{statusCard}',
      },
    },
    EXTREME: {
      ask: 'The fire rating for the {name} region {calendarDate} is {status}. Expect extremely hot, dry and windy conditions. What else can I do for you?',
      reprompt: 'What else can I do for you?',
      card: {
        type: 'Standard',
        title: 'Fire Danger for {name} - {status}',
        text: '{statusCard}',
      },
    },
    'CODE RED': {
      ask: 'The fire rating for the {name} region {calendarDate} is {status}. The safest place to be is away from high risk bushfire areas. What else can I do for you?',
      reprompt: 'What else can I do for you?',
      card: {
        type: 'Standard',
        title: 'Fire Danger for {name} - {status}',
        text: '{statusCard}',
      },
    },
  },
  FireBan: {
    None: {
      ask: 'There is no fire ban for the {name} region {calendarDate}. {fireRatingBoth}. What else can I do for you?',
      reprompt: 'What else can I do for you?',
    },
    Total: {
      ask: 'There is a total fire ban for the {name} region {calendarDate}. No fires can be lit or be allowed to remain alight in the open air from 12:01 AM until 11:59 PM. What else can I do for you?',
      reprompt: 'What else can I do for you?',
    },
  },
  Error: {
    API: {
      tell: 'There was a problem accessing fire data. Please try again later.',
    },
    Invalid: {
      ask: "I can't find data for this day. What else can I help you with?",
      reprompt: 'What else can I do for you?',
    },
  },
};
module.exports = {
  en: {
    translation: views,
  },
};
