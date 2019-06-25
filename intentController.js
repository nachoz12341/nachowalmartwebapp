const entityMap = require('./entityMap.js');
const request = require('request');

function getIntentResponse(intent, session, callback) {
    let sourceId = '';
    let countryId = '';
    let categoryId = '';

    let url='https://newsapi.org/v2/top-headlines?apiKey=0eefa07bb1bb480bad3277dcfc313086';

    if (intent === "testConnection")
        return callback("The test has completed successfully, the server is up.");

    if (intent === "headlineSource" || intent === "descriptionSource") {
        sourceId = entityMap.source[session.queryResult.parameters.source];
        url+='&sources='+sourceId;
    }
    else {
        countryId = entityMap.country[session.queryResult.parameters.country];
        categoryId = entityMap.category[session.queryResult.parameters.category];
        url+='&country='+countryId;
        url+='&category='+categoryId;
    }

    console.log(url);

   request(url,{json: true},(err,res,body)=>{
       if(err) {return console.log(err);}
       
       return callback(body);
   });
}

module.exports.getIntentResponse = getIntentResponse;