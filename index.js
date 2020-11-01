const intentController = require('./intentController.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    const intentName = req.body.queryResult.intent.displayName;
    const parameters = req.body.queryResult.parameters;

    intentController.getIntentResponse(intentName, parameters, (responseText) => {
        res.send({ "fulfillmentText": responseText });
    });
});

app.get('/', (req,res) =>{
    res.send("Hello world!");
});

const port = process.env.PORT || 25565;
app.listen(port);
