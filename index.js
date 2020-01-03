const Joi = require('joi');
const mysql = require('mysql');


const express = require('express');
const app = express();

app.use(express.json());

var mysqlConnection = mysql.createConnection({
    connectionLimit: 100,
    socketPath: "/cloudsql/ascendant-bloom-259119:europe-west3:animal-care-opjspr",
    host: '35.242.231.190',
    port: '3306',
    user: 'pawel',
    password: 'psyikoty123',
    database: 'mydb'
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined,2));
});




app.get('/', (req, res) => {
    res.send(`Animal Care API.`);
  });
  

app.get('/api/ogloszenie', (req,res) => {
    mysqlConnection.query('SELECT * FROM Ogloszenie', (err,rows,fields) => {
        res.send(rows);
    })  
});


app.get('/api/lokalizacja', (req,res) => {
    mysqlConnection.query('SELECT * FROM Lokalizajca', (err,rows,fields) => {
        res.send(rows);
    })
});

app.get('/api/oferta', (req,res) => {
    mysqlConnection.query('SELECT * FROM Oferta', (err,rows,fields) => {
        res.send(rows);
    })
});

app.get('/api/opieka', (req,res) => {
    mysqlConnection.query('SELECT * FROM Opieka', (err,rows,fields) => {
        res.send(rows);
    })
});

app.get('/api/plan', (req,res) => {
    mysqlConnection.query('SELECT * FROM Plan', (err,rows,fields) => {
        res.send(rows);
    })
});

app.get('/api/termin', (req,res) => {
    mysqlConnection.query('SELECT * FROM Termin', (err,rows,fields) => {
        res.send(rows);
    })
});

app.get('/api/uzytkownik', (req,res) => {
    mysqlConnection.query('SELECT * FROM Uzytkownik', (err,rows,fields) => {
        res.send(rows);
    })
});

app.get('/api/wiadomosc', (req,res) => {
    mysqlConnection.query('SELECT * FROM Wiadomosc', (err,rows,fields) => {
        res.send(rows);
    })
});

app.get('/api/zwierze', (req,res) => {
    mysqlConnection.query('SELECT * FROM Zwierze', (err,rows,fields) => {
        res.send(rows);
    })
});

/*
app.post('/api/courses', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if(result.error){
        // 400 Bad Request
        res.status(400).send(result.error);
        return;
    }

    const course = {
        id : courses.length + 1,
        name : req.body.name
    };

    courses.push(course);
    res.send(course);

})
*/



const server = app.listen(8080, () => {
    
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Animal Care API, listening at http://${host}:${port}`);
});
 