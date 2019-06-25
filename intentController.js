const entityMap = require('./entityMap.js');
const request = require('request');

function getIntentResponse(intent, sessionParams, callback) {
    let sourceId = '';
    let countryId = '';
    let categoryId = '';

    let url = 'https://newsapi.org/v2/top-headlines?apiKey=0eefa07bb1bb480bad3277dcfc313086';

    if (intent === "testConnection")
        return callback("The test has completed successfully, the server is up.");

    if (intent.includes('Source')) {
        sourceId = entityMap.source[sessionParams.source];
        url += '&sources=' + sourceId;
    }
    else {
        countryId = entityMap.country[sessionParams.country];
        categoryId = entityMap.category[sessionParams.category];
        url += '&country=' + countryId;
        url += '&category=' + categoryId;
    }

    console.log(url);

    request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        let responseText = '';
        let articleNum = 0;

        //find an article with a description
        while (body.articles[articleNum].description === null && articleNum < 10)
            articleNum++;

        if (intent.includes('headline'))
            responseText = 'This headline is from ' + body.articles[articleNum].source.name + ', ' + body.articles[articleNum].title + '. Would you like to hear more about this story?';
        else
            responseText = 'Here is some more information. ' + body.articles[articleNum].description + '. If you would like to hear more news, simply ask. You can specify country, topic or source.';

        return callback(responseText);
    });
}

module.exports.getIntentResponse = getIntentResponse;