const Joi = require('joi');
const mysql = require('mysql');


const express = require('express');
const app = express();

module.exports.app = app;

app.use(express.json());

const databaseConnection = require('./controllers/db_connection');

databaseConnection.instance;
databaseConnection.connect;

const ogloszenie_route = require('./routes/ogloszenie');
const lokalizacja_route = require('./routes/lokalizacja');
const oferta_route = require('./routes/oferta');
const opieka_route = require('./routes/opieka');
const plan_route = require('./routes/plan');
const termin_route = require('./routes/termin');
const uzytkownik_route = require('./routes/uzytkownik');
const wiadomosc_route = require('./routes/wiadomosc');
const zwierze_route = require('./routes/zwierze');





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
 