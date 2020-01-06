//importing instances of controllers funtions
var controller = require('../controllers/wiadomosc');

//importing app instance
var app = require('../app');

app.app.get('/api/wiadomosc', controller.get_all);

app.app.get('/api/wiadomosc/:id', controller.get_by_id);

app.app.delete('/api/wiadomosc/:id', controller.delete_by_id);

app.app.post('api/wiadomosc', controller.add);