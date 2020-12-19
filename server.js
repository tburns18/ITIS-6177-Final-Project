const express = require('express');
const app = express();
const port = 3000;


const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const axios = require('axios');

const options = {
    swaggerDefinition: {
      info: {
        title: 'Language Understanding API',
        version: '1.0.0',
        description: 'Final Project documentation'
      },
      host: 'localhost:3000',
      basePath: '/'
    },
    apis: ['./server.js'],
  };

  const specs = swaggerJsdoc(options);

  //
// This quickstart shows how to predict the intent of an utterance by using the LUIS REST APIs.
//

var requestPromise = require('request-promise');
var queryString = require('querystring');

// Analyze a string utterance.
async function getPrediction(input) {

    //////////
    // Values to modify.

    // YOUR-APP-ID: The App ID GUID found on the www.luis.ai Application Settings page.
    const LUIS_appId = "9f384712-f2f6-42ef-9b29-c95230aefd3b";

    // YOUR-PREDICTION-KEY: Your LUIS authoring key, 32 character value.
    const LUIS_predictionKey = "737647a71a254f4596958f7573b373bd";

    // YOUR-PREDICTION-ENDPOINT: Replace this with your authoring key endpoint.
    // For example, "https://westus.api.cognitive.microsoft.com/"
    const LUIS_endpoint = "https://6177finalproject-authoring.cognitiveservices.azure.com/";

    // The utterance you want to use.
    const utterance = input;
    //////////

    // Create query string
    const queryParams = {
        "show-all-intents": true,
        "verbose":  true,
        "query": utterance,
        "subscription-key": LUIS_predictionKey
    }

    // Create the URI for the REST call.
    const URI = `${LUIS_endpoint}luis/prediction/v3.0/apps/${LUIS_appId}/slots/production/predict?${queryString.stringify(queryParams)}`

    // Send the REST call.
    const response = await requestPromise(URI);

    // Display the response from the REST call.
    console.log(response);

    return response;
}

// Pass an utterance to the sample LUIS app
//getPrediction().then(()=>console.log("done")).catch((err)=>console.log(err));

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use(cors());
  app.use(bodyParser.json({type: 'application/json'}));

/**
 * @swagger
 * /pizza:
 *     post:
 *       tags:
 *         - Main
 *       description: Calls LUIS API to retrieve LUIS output from language
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: document
 *           in: body
 *           description: String input for pizza conversation
 *           required: true
 *       responses:
 *         200:
 *           description: Successfully returned response from LUIS API
 */

app.post('/pizza', async (req, res) => {
    console.log(req.body);

    var stringIn = JSON.stringify(req.body);
    console.log(stringIn);

    const input = [
        stringIn
    ]

    try {
        const intentResponse = await getPrediction(input);
        console.log(intentResponse);

        res.setHeader('Content-Type', 'application/json');
        res.json(intentResponse);

    } catch(err) {
        throw err;
    }
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});