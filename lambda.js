var https = require("https");

const hello = context => {
  context.succeed(
    generateResponse(buildSpeechletResponse(`Hello from the Peeboo`, false), {})
  );
};

const litterTrayPoos = context => {
  context.succeed(
    generateResponse(
      buildSpeechletResponse(`I have done no poos in my litter tray`, false),
      {}
    )
  );
};

const kitchenPoos = context => {
  context.succeed(
    generateResponse(
      buildSpeechletResponse(
        `All of my poos go on the kitchen floor, you know this.`,
        false
      ),
      {}
    )
  );
};

const howManyPoos = context => {
  const number = Math.floor(Math.random() * 100);
  context.succeed(
    generateResponse(
      buildSpeechletResponse(`I have done ${number} plops today`, false),
      {}
    )
  );
};

const howManyPoosSince = (context, date) => {
  const number = Math.floor(Math.random() * 10000);
  const dateString = date.toString();
  context.succeed(
    generateResponse(
      buildSpeechletResponse(
        `I have done ${number} plops since ${dateString}`,
        false
      ),
      {}
    )
  );
};
exports.handler = (event, context) => {
  try {
    if (event.session.new) {
      // New Session
      console.log("NEW SESSION");
    }

    switch (event.request.type) {
      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`);
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Hello. It is Peeboo.", false),
            {}
          )
        );
        break;

      case "IntentRequest":
        // Intent Request
        console.log(`INTENT REQUEST`);

        switch (event.request.intent.name) {
          case "Hello":
            hello(context);
            break;

          case "LitterTrayPoos":
            litterTrayPoos(context);
            break;

          case "KitchenPoos":
            kitchenPoos(context);
            break;

          case "HowManyPoos":
            howManyPoos(context);
            break;

          case "GetVideoViewCountSinceDate":
            howManyPoosSince(context, event.request.intent.slots.PooDate.value);
            break;

          default:
            throw "Invalid intent";
        }

        break;

      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`);
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`);
    }
  } catch (error) {
    context.fail(`Exception: ${error}`);
  }
};

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  };
};

generateResponse = (speechletResponse, sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };
};
