const launchScreen = 'https://s3-ap-southeast-2.amazonaws.com/alexa-dominos-spot-assets/Backgrounds/Launch.jpg';
const placeOrderScreen = 'https://s3-ap-southeast-2.amazonaws.com/alexa-dominos-spot-assets/Backgrounds/Place+order.jpg';
const placeOrderOverlayScreen = 'https://s3-ap-southeast-2.amazonaws.com/alexa-dominos-spot-assets/Backgrounds/Place+order+-+Overlay.jpg';
const welcomeScreen = 'https://s3-ap-southeast-2.amazonaws.com/alexa-dominos-spot-assets/Backgrounds/Welcome.jpg';
const welcomeOverlayScreen = 'https://s3-ap-southeast-2.amazonaws.com/alexa-dominos-spot-assets/Backgrounds/Welcome+-+Overlay.jpg';
const noQuickOrderScreen = 'https://s3-ap-southeast-2.amazonaws.com/alexa-dominos-spot-assets/Elements/noquickorder.png';
const orderStatusScreen = 'https://s3-ap-southeast-2.amazonaws.com/alexa-dominos-spot-assets/Elements/{orderStatus}.png';
const accountLinkImage = 'https://s3-ap-southeast-2.amazonaws.com/alexa-dominos-spot-assets/Elements/AccountLinking.png';

module.exports = {
  Welcome: {
    type: 'Display.RenderTemplate',
    template: {
      type: 'BodyTemplate6',
      backgroundImage: {
        contentDescription: 'Domino\'s Welcome Screen',
        sources: [{
          url: launchScreen,
        }],
      },
      backButton: 'HIDDEN',
    },
  },
  Exit: {
    type: 'Display.RenderTemplate',
    template: {
      backButton: 'HIDDEN',
      type: 'BodyTemplate6',
      title: 'Review',
      backgroundImage: {
        contentDescription: 'Domino\'s End Screen',
        sources: [{
          url: welcomeScreen,
        }],
      },
      textContent: {
        primaryText: {
          text: '<font size="7">Thank you for using Domino\'s</font>',
          type: 'RichText',
        },
      },
    },
  },
  ExitSuccess: {
    type: 'Display.RenderTemplate',
    template: {
      backButton: 'HIDDEN',
      type: 'BodyTemplate6',
      title: 'Review',
      backgroundImage: {
        contentDescription: 'Domino\'s End Screen',
        sources: [{
          url: placeOrderOverlayScreen,
        }],
      },
      textContent: {
        primaryText: {
          text: '<font size="7">Your order is being prepared!</font>',
          type: 'RichText',
        },
      },
    },
  },
  PlaceOrder: {
    type: 'Display.RenderTemplate',
    template: {
      backButton: 'HIDDEN',
      type: 'BodyTemplate6',
      title: 'Review',
      backgroundImage: {
        contentDescription: 'Place your order',
        sources: [{
          url: placeOrderScreen,
        }],
      },
      textContent: {
        primaryText: {
          text: '<font size="7">Place your order</font>',
          type: 'RichText',
        },
      },
    },
  },
  TrackOrder: {
    type: 'Display.RenderTemplate',
    template: {
      backButton: 'HIDDEN',
      type: 'BodyTemplate6',
      title: 'Review',
      backgroundImage: {
        contentDescription: 'Track your order',
        sources: [{
          url: placeOrderScreen,
        }],
      },
      textContent: {
        primaryText: {
          text: '<font size="7">Place your order</font>',
          type: 'RichText',
        },
      },
    },
  },
  Review: {
    type: 'Display.RenderTemplate',
    template: {
      backButton: 'HIDDEN',
      type: 'BodyTemplate2',
      title: 'Review',
      image: {
        contentDescription: 'Wooden Background',
        sources: [{
          url: welcomeOverlayScreen,
        }],
      },
      textContent: {
        primaryText: {
          text: '<font size="7">Like our Skill?<br/>Head to the Alexa App and rate us <br/><br/>{star}{star}{star}{star}{star}</font>',
          type: 'RichText',
        },
      },
    },
  },
  Help: {
    type: 'Display.RenderTemplate',
    template: {
      backButton: 'HIDDEN',
      type: 'BodyTemplate2',
      title: 'Welcome',
      image: {
        contentDescription: 'Wooden Background',
        sources: [{
          url: welcomeOverlayScreen,
        }],
      },
      textContent: {
        primaryText: {
          text: '<font size="7">I can place your quick order or track the status of your order</font>',
          type: 'RichText',
        },
      },
    },
  },
  LinkAccount: {
    type: 'Display.RenderTemplate',
    template: {
      backButton: 'HIDDEN',
      type: 'BodyTemplate7',
      title: 'Link your account via the Alexa App',
      backgroundImage: {
        contentDescription: 'Wood',
        sources: [{
          url: welcomeScreen,
        }],
      },
      image: {
        contentDescription: 'Mount St. Helens landscape',
        sources: [{
          url: accountLinkImage,
        }],
      },
    },
  },
  NoQuickOrder: {
    type: 'Display.RenderTemplate',
    template: {
      backButton: 'HIDDEN',
      type: 'BodyTemplate7',
      title: 'Set up your quick order',
      backgroundImage: {
        contentDescription: 'Wood',
        sources: [{
          url: welcomeScreen,
        }],
      },
      image: {
        contentDescription: 'Mount St. Helens landscape',
        sources: [{
          url: noQuickOrderScreen,
        }],
      },
    },
  },
  OrderStatus: {
    type: 'Display.RenderTemplate',
    template: {
      backButton: 'HIDDEN',
      type: 'BodyTemplate7',
      title: '{orderStatusTitle}',
      backgroundImage: {
        contentDescription: 'Wood',
        sources: [{
          url: welcomeScreen,
        }],
      },
      image: {
        contentDescription: 'Mount St. Helens landscape',
        sources: [{
          url: orderStatusScreen,
        }],
      },
    },
  },
  ListOrder: {
    type: 'Display.RenderTemplate',
    template: {
      backButton: 'HIDDEN',
      type: 'ListTemplate1',
      title: 'Your Order',
      backgroundImage: {
        contentDescription: 'Domino\'s End Screen',
        sources: [{
          url: welcomeScreen,
        }],
      },
      listItems: '{orderDetailsScreen}',
    },
  },
};
