const intentController = require('./intentController.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Answer dialogflow post request
app.post('/', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;
    const parameters = req.body.queryResult.parameters;

    intentController.getIntentResponse(intentName, parameters, (responseText) => {
        res.send({ "fulfillmentText": responseText });
    });
});

const port = process.env.PORT || 1337;
app.listen(port);
