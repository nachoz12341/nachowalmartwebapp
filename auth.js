const sql = require('mssql');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

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

function calculateHash(data) {
    hash.update(data);
    return hash.digest('hex');
}

function checkCredentials(user,pass){
    const sqlQuery = "Select * from credentials where username = "+user+";";
    const request = new sql.Request();

    request.query(sqlQuery).then(result =>{
        if(result===calculateHash(pass))
            return true;
        return false;
    });
}

module.exports=checkCredentials();


