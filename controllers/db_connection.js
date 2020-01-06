var mysql = require('mysql');

const instance = mysql.createConnection({
    connectionLimit: 100,

    //comment "socketPath" line if you want to run application on localhost
    //socketPath: "/cloudsql/ascendant-bloom-259119:europe-west3:animal-care-opjspr",
    host: '35.242.231.190',
    port: '3306',
    user: 'pawel',
    password: 'psyikoty123',
    database: 'mydb'
});


module.exports.instance = instance;

module.exports.connect = instance.connect((err) => {
    if(!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined,2));
});

