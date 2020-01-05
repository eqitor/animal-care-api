//importing instances of controllers funtions
var controller = require('../controllers/termin');

//importing app instance
var app = require('../app');

app.app.get('/api/termin', controller.get_all);

app.app.get('/api/termin/:id', controller.get_by_id);

app.app.delete('/api/termin/:id', controller.delete_by_id);

app.app.post('/api/termin', controller.add);