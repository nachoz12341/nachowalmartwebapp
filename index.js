const express = require('express');
const app = express();
const sql = require('mssql');

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

app.post('/',(req,res) =>{
    let request = new sql.Request();
    let webhookResponse = {
        "fulfillmentText": "Sent a response from Azure!"
    };

    request.query("INSERT INTO books (title, author, id) VALUES ('dialogflow test','Nacho',69);").then(result => {
        res.send(webhookResponse);
    });
});

const port = process.env.PORT || 1337;

app.listen(port,() => console.log('Example app listening on port 8080'));