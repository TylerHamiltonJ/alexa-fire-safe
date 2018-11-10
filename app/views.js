const screen = require('./screens');

const views = {
  Launch: {
    Begin: {
      ask: "Welcome to Cocktail King. <audio src='https://s3-ap-southeast-2.amazonaws.com/alexa-sfx-tylerhamiltonj/in.mp3'/> You can ask for the ingredients of a specific cocktail, or find out how to make one. {welcomeInstruction}",
      reprompt: '{welcomeInstruction}',
      directives: [screen.Welcome],
    },
  },
  Ingredient: {
    Unknown: {
      ask: "Hmmm, I don't know the ingredient {ingredient_slot}. Is there another ingredient you'd like to try?",
      reprompt: "Is there another ingredient you'd like to try?",
    },
  },
  Help: {
    General: {
      ask: `I can find the ingredients and recipes for your favourite cocktails. To find the ingredients of a cocktail, you can ask: 'What's in a martini'.
        To find out how to make a drink, you can ask: 'How do I make a bloody mary.'
        To get a drink recommendation, you can ask: What can I make with gin?
        To get a random recommendation, you can ask Cocktail King to surprise you.
        What would you like to do?`,
      reprompt: 'What would you like to do?',
    },
  },
  Drinks: {
    CantMake: {
      ask: "That's an interesting combination. I can't find any good recipes with {userIngredients}. Is there another drink you want to make?",
      reprompt: 'What else can I help you with?',
    },
    Suggest: {
      ask: '{interjectYum} How about {drinkName}? It contains {ingredients}. Would you like to know how to make it?',
      reprompt: 'Would you like to know how to make it?',
    },
    RandomSuggest: {
      ask: [
        "Okay, let's try something with {suggestedIngredient}! What about {drinkName}? It contains {ingredients}. Would you like to know how to make it?",
        "Okay, here's one with {suggestedIngredient}! It's called a {drinkName}? It contains {ingredients}. Would you like to know how to make it?",
        'Sure, how about a {drinkName}? It contains {ingredients}. Would you like to know how to make it?',
      ],
      reprompt: 'Would you like to know how to make it?',
    },
    NoMore: {
      ask: 'There are no more drinks matching your criteria. What else can I help you with?',
      reprompt: 'What else can I help you with?',
    },
    Recipe: {
      ask: {
        alexa: "{interjectYum} {glassType}. To make it, {instructions}. I've also sent you instructions in your Alexa app. Is there another drink you want to make?",
        dialogflow: '{glassType} To make it, {instructions}. Is there another drink you want to make?',
      },
      reprompt: 'Is there another drink you want to make?',
      alexaCard: {
        type: 'Standard',
        title: '{drinkName}',
        text: '{ingredientsCard}\n{instructions}',
      },
      dialogFlowBasicCard: '{dialogflowCardInstructions}',
    },
    Instructions: {
      ask: {
        alexa: "{drinkName} contains {ingredients}. To make it, {instructions}. {glassType} I've also sent you instructions to your Alexa app. Is there another drink you want to make?",
        dialogflow: '{drinkName} contains {ingredients}. To make it, {instructions}. {glassType} Is there another drink you want to make?',
      },
      reprompt: 'Is there another drink you want to make?',
      alexaCard: {
        type: 'Standard',
        title: '{drinkName}',
        text: '{ingredientsCard}\n{instructions}',
      },
      dialogFlowBasicCard: '{dialogflowCardInstructions}',
    },
    Ingredients: {
      ask: '{drinkName} contains {ingredients}. Would you like to know how to make it?',
      reprompt: 'Would you like to know how to make it?',
      alexaCard: {
        type: 'Standard',
        title: '{drinkName}',
        text: '{ingredientsCard}',
      },
      // dialogFlowBasicCard: '{dialogflowCardIngredients}',
    },
    ChooseOther: {
      ask: 'No worries! Is there another drink you want to make?',
      reprompt: 'Is there another drink you want to make?',
    },
    NotFound: {
      ask: "Hmmmm, I'm not sure what {drinkSlot} is. Is there another drink you want to make?",
      reprompt: 'Is there another drink you want to make?',
    },
    AskWhichDrink: {
      ask: 'Sure, which drink would you like to make?',
      reprompt: 'Which drink would you like to make?',
    },
  },
  End: {
    Message: {
      tell: "No worries. Thanks for using Cocktail King! <audio src='https://s3-ap-southeast-2.amazonaws.com/alexa-sfx-tylerhamiltonj/out.mp3'/>",
    },
  },
  Entry: {
    Message: {
      ask: 'Okay, you can search by ingredient name, drink name, or ask for a random drink. What would you like to do?',
      reprompt: 'What would you like to do?',
    },
  },
  AgeGate: {
    Ask: {
      ask: 'Cocktail King contains mature content. Are you over the age of {drinkingAge}?',
      reprompt: 'Are you over the age of {drinkingAge}?',
    },
    Deny: {
      tell: "Unfortunately, I can't serve you. Come back when you're older.",
    },
    Confirm: {
      say: 'Great! ',
    },
  },
  Error: {
    Crash: {
      tell: "I'm sorry. Cocktail King is a bit tipsy at the moment.",
    },
    Unknown: {
      tell: "I'm sorry. I don't know how to make a {drinkName}.",
    },
    UnknownIntentEnd: {
      tell: "Oh dear, I can't seem to understand you right now. Please try again later.",
    },
    UnknownIntent: {
      ask: "I'm sorry. I didn't understand. {welcomeInstruction}. What would you like to do?",
      reprompt: '{welcomeInstruction}. What would you like to do?',
    },
    UnknownIngredient: {
      tell: "I'm sorry. I don't know the ingredient {ingredientName}",
    },
    Exit: {
      tell: 'No problem. Come back when you want to make a drink. Thanks for using Cocktail King.',
    },
  },
};
module.exports = {
  en: {
    translation: views,
  },
};
