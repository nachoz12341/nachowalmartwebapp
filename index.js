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

var countryMap = {
    "england": "gb",
    "britain": "gb",
    "uk": "gb",
    "english": "gb",
    "france": "fr",
    "french": "fr",
    "germany": "de",
    "german": "de",
    "united states": "us",
    "america": "us",
    "us": "us",
    "usa": "us",
    "american": "us"
};

var categoryMap = {
    "general": "general",
    "health": "health",
    "science": "science",
    "sports": "sports",
    "technology": "technology",
    "tech": "technology",
    "entertainment": "entertainment",
    "movies": "entertainment",
    "movie": "entertainment",
    "business": "business"
};

//Answer dialogflow post request
app.post('/', (req, res) => {
    let data = '';

    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
        const session = JSON.parse(data);
        const intentName = session.queryResult.intent.displayName;
        let responseText = "This is the default response: " + intentName;

        if (intentName === "testConnection") {
            responseText = "The test has completed successfully, the azure server is up.";
            res.send({ "fulfillmentText": responseText });
        }

        if (intentName === "headlineSource") {
            const source = sourceMap[session.queryResult.parameters.source];
            findHeadlineSource(res, source);
        }

        if (intentName === "headlineCountryCategory") {
            const country = countryMap[session.queryResult.parameters.country];
            const category = categoryMap[session.queryResult.parameters.category];
            findHeadlineCountryCategory(res, country, category);
        }
        if (intentName === "descriptionSource") {
            const source = sourceMap[session.queryResult.parameters.source];
            findDescriptionSource(res, source);
        }

        if (intentName === "descriptionCountryCategory") {
            const country = countryMap[session.queryResult.parameters.country];
            const category = categoryMap[session.queryResult.parameters.category];
            findDescriptionCountryCategory(res, country, category);
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
        res.on('error', (err) => { console.log(err); });
    });
}

function findDescriptionSource(response, source) {
    https.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=0eefa07bb1bb480bad3277dcfc313086', (res) => {
        let body = '';

        res.on('data', (d) => { body += d; });
        res.on('end', () => {
            const json = JSON.parse(body);
            let articleNum = 0;

            while (json.articles[articleNum].description === null && articleNum < 10)
                articleNum++;

            const responseText = 'Here is some more information. ' + json.articles[articleNum].description + '. If you would like to hear more news, simply ask. You can specify country, topic or source.';

            response.send({ "fulfillmentText": responseText });
        });
        res.on('error', (e) => { console.log(e); });
    });
}

function findHeadlineCountryCategory(response, country, category) {
    https.get('https://newsapi.org/v2/top-headlines?country=' + country + '&category=' + category + '&apiKey=0eefa07bb1bb480bad3277dcfc313086', (res) => {
        let body = '';

        res.on('data', (d) => { body += d; });
        res.on('end', () => {
            const json = JSON.parse(body);
            let articleNum = 0;

            while (json.articles[articleNum].description === null && articleNum < 10)
                articleNum++;

            const responseText = 'This headline is from ' + json.articles[articleNum].source.name + ', ' + json.articles[articleNum].title + '. Would you like to hear more about this story?';

            if(country=="us")
                response.send({ "fulfillmentText": responseText });
            else
                response.send({"fulfillmentText":json.aricles[articleNum].title,"languageCode": country});
        });
        res.on('error', (e) => { console.log(e); });
    });
}

function findDescriptionCountryCategory(response, country, category) {
    https.get('https://newsapi.org/v2/top-headlines?country=' + country + '&category=' + category + '&apiKey=0eefa07bb1bb480bad3277dcfc313086', (res) => {
        let body = '';

        res.on('data', (d) => { body += d; });
        res.on('end', () => {
            const json = JSON.parse(body);
            let articleNum = 0;

            while (json.articles[articleNum].description === null && articleNum < 10)
                articleNum++;

            const responseText = 'Here is some more information. ' + json.articles[articleNum].description + '. If you would like to hear more news, simply ask. You can specify country, topic or source.';

            if(country=="us")
                response.send({ "fulfillmentText": responseText });
            else
                response.send({"fulfillmentText":json.aricles[articleNum].description,"languageCode": country});
        });
        res.on('error', (e) => { console.log(e); });
    });
}