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

app.post('/', (req, res) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
        let session = JSON.parse(data);        
        let intent = session.fullfillmentText;

        res.send({ "fullfillmentText": intent});
    });
});

const port = process.env.PORT || 1337;
app.listen(port);