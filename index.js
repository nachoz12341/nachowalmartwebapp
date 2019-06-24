const auth = require('./auth');
const https = require('https');
const express = require('express');
const app = express();

var sourceMap = {
    "cnn": "cnn",
    "espn": "espn",
    "fox news": "fox-news",
    "nbc": "nbc-news",
    "ars-technica": "ars-technica",
    "ars": "ars-technica",
    "ars technica": "ars-technica",
    "buzzfeed": "buzzfeed",
    "engadget": "engadget",
    "fortune": "fortune",
    "cbs news": "cbs-news",
    "cbs": "cbs-news"
};

//Answer dialogflow post request
app.post('/', (req, res) => {
    let data = '';

    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {

        console.log("---------------------------");
        console.log("url: "+req.param);
        console.log("Body: "+req.body);
        console.log("---------------------------");

        const session = JSON.parse(data);
        const intentName = session.queryResult.intent.displayName;
        let responseText = "This is the default response: " + intentName;

        if (intentName === "testConnection") {
            responseText = "The test has successfully responded: " + JSON.stringify(session);
            res.send({ "fulfillmentText": responseText });
        }

        if (intentName === "headlineSource") {
            let source = sourceMap[session.queryResult.parameters.source];
            findHeadlineSource(res, source);
        }

    });
});

const port = process.env.PORT || 1337;
app.listen(port);



function findHeadlineSource(response, source) {
    https.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=0eefa07bb1bb480bad3277dcfc313086', (res) => {
        let body = '';

        res.on('data', (d) => { body += d; });
        res.on('end', () => {
            const json = JSON.parse(body);
            let articleNum = 0;

            while (json.articles[articleNum].description === null && articleNum < 10)
                articleNum++;

            let responseText = 'This headline is from ' + json.articles[articleNum].source.name + ', ' + json.articles[articleNum].title + '. Would you like to hear more about this story?';

            response.send({ "fulfillmentText": responseText });
        });
        res.on('error', (err) => {
            console.log(err);
        });
    });
}