//importing instances of controllers funtions
var controller = require('../controllers/lokalizacja');

//importing app instance
var app = require('../app');

app.app.get('/api/lokalizacja', controller.get_all);

app.app.get('/api/lokalizacja/:id', controller.get_by_id);

app.app.delete('/api/lokalizacja/:id', controller.delete_by_id);

app.app.post('/api/lokalizacja', controller.add);