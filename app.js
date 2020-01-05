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
const logger_route = require('./routes/logger');
const views_route = require('./routes/views');
const procedures_route = require('./routes/procedures');
const general_route = require('./routes/general');


const server = app.listen(8080, () => {
    
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Animal Care API, listening at http://${host}:${port}`);
});
 