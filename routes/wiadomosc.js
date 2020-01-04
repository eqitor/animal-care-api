//importing instances of controllers funtions
var controller = require('../controllers/wiadomosc');

//importing app instance
var app = require('../app');

app.app.get('/api/wiadomosc', controller.get_all);

app.app.get('/api/wiadomosc/:id', controller.get_by_id);

