const intentController = require('./intentController.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Answer dialogflow post request
app.post('/', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;

    intentController.getIntentResponse(intentName, req.body, (responseText) => {
        res.send({ "fulfillmentText": responseText });
    });
});

const port = process.env.PORT || 1337;
app.listen(port);
