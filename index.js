const express = require('express');
const app = express();
const intentController = require('./intentController.js');

//Express body parser???
//Answer dialogflow post request
app.post('/', (req, res) => {
    let data = '';

    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
        const session = JSON.parse(data);
        const intentName = session.queryResult.intent.displayName;

        intentController.getIntentResponse(intentName, session, (responseText) => {
            res.send({ "fulfillmentText": responseText });
        });
    });
});

const port = process.env.PORT || 1337;
app.listen(port);
