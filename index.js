const sql = require('mssql');
const https = require('https');
const express = require('express');
const app = express();

//database login info
const config = {
    user: 'library',
    password: 'Dallas2001',
    server: 'pslibrarynacho.database.windows.net',
    database: 'PSLibrary',

    options: {
        encrypt: true
    }
};

sql.connect(config).catch(err => console.log(err));

//Answer dialogflow post request
app.post('/', (req, res) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
        const session = JSON.parse(data);
        const intentName = session.queryResult.intent.displayName;
        let responseText = "This is the default response: "+intentName;

        if (intentName === "testConnection")
        {
            responseText = "The test has successfully responded: "+intentName;
            res.send({ "fulfillmentText": responseText });
        }

        if(intentName === "headlineSource")
            findHeadlineSource(res,session.queryResult.parameters.source);

        
    });
});

const port = process.env.PORT || 1337;
app.listen(port);



function findHeadlineSource(response,source) {
    https.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey=0eefa07bb1bb480bad3277dcfc313086', (res) => {
        let body = '';

        res.on('data', (d) =>{body+=d;});
        res.on('end', () =>{
            const json = JSON.parse(body);
            let articleNum = 0;

            while(json.articles[articleNum].description===null && articleNum<10)
                articleNum++;

            let responseText = 'This headline is from '+json.articles[articleNum].source.name+', '+json.articles[articleNum].title+'. Would you like to hear more about this story?'; 
                
            response.send({ "fulfillmentText": responseText });
        });
    });
}