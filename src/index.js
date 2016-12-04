'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.180950b4-ebb3-4eb2-ab17-f05cea745148'


var languageStrings = {
    "en-US": {
        "translation": {
            "DRINKS": [
                "A small brewed coffee.",
                "A medium brewed coffee.",
                "A large brewed coffee.",
                "A french press",
                "A pour over",
                "A chemex",
                "A small cold brew",
                "A medium cold brew",
                "A large cold brew",
                "A small espresso",
                "A medium espresso",
                "A small single origin",
                "A medium single origin",
                "A small americano",
                "A medium americano",
                "A large americano",
                "A small latte",
                "A medium latte",
                "A large latte",
                "A cappuccino",
                "A small mocha",
                "A medium mocha",
                "A large mocha",
                "A small maacchiato",
                "A small brewshine",
                "A medium brewshine",
                "A large brewshine",
                "A small hot chocolate",
                "A medium hot chocolate",
                "A large hot chocolate",
                "A small steamer",
                "A medium steamer",
                "A large steamer",
                "A small Italian soda",
                "A medium Italian soda",
                "A large Italian soda",
                "A tea", 
                "A small iced tea",
                "A medium iced tea", 
                "A large iced tea",
                "A small chai latte", 
                "A medium chai latte", 
                "A large chai latte", 
                "A medium smoothie", 
                "A large smoothie", 
                "A matcha latte"
            ],
            "SKILL_NAME" : "My Barista",
            "GET_DRINK_MESSAGE" : "Here's your drink suggestion for today: ",
            "HELP_MESSAGE" : "You can as me for a drink suggestion, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!",
            "UNSURE_MESSAGE" : "I am sorry, but I am not sure what you asked me."
        }
    },
    "de-DE": {
        "translation": {
            "DRINKS": [],
            "SKILL_NAME" : "My Barista",
            "GET_DRINK_MESSAGE" : "Here's your drink suggestion for today: ",
            "HELP_MESSAGE" : "You can as me for a drink suggestion, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!",
            "UNSURE_MESSAGE" : "I am sorry, but I am not sure what you asked me."
        }
    },
    "en-GB": {
        "translation": {
            "DRINKS": [
            ],
            "SKILL_NAME" : "My Barista",
            "GET_DRINK_MESSAGE" : "Here's your drink suggestion for today: ",
            "HELP_MESSAGE" : "You can as me for a drink suggestion, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!",
            "UNSURE_MESSAGE" : "I am sorry, but I am not sure what you asked me."
        }
    },
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetDrink');
    },
    'GetCustomerDrink': function () {
        this.emit('GetDrink');
    },
    'GetDrink': function () {
        // Get a random drink from the drink list
        // Use this.t() to get corresponding language data
        var drinkArr = this.t('DRINKS');
        var drinkIndex = Math.floor(Math.random() * drinkArr.length);
        var randomDrink = drinkArr[drinkIndex];

        // Create speech output
        var speechOutput = this.t("GET_DRINK_MESSAGE") + randomDrink;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomDrink)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'Unhandled': function () {
    this.emit(':ask', this.t("UNSURE_MESSAGE"));
    },
};