const express = require('express');
const app = express();

app.get('/',(req,res) =>{
    let webhookResponse = {
        "fulfillmentText": "Sent a response from Azure!"
    };

    res.send(webhookResponse);
    res.sendStatus(200);
});

const port = process.env.PORT || 1337;

app.listen(port,() => console.log('Example app listening on port 8080'));