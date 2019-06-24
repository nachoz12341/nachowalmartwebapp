const sql = require('mssql');
const intentController = require('./intentController');
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
            responseText = "The test has successfully responded: "+intentName;

        if(intentName === "headlineSource")
        {
            responseText = "Heres a headline from "+session.queryResult.parameters.source;
        }

        res.send({ "fulfillmentText": responseText });
    });
});

const port = process.env.PORT || 1337;
app.listen(port);