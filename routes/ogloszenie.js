//importing instances of controllers funtions
var controller = require('../controllers/ogloszenie');

//importing app instance
var app = require('../app');

app.app.get('/api/ogloszenie', controller.get_all);

app.app.get('/api/ogloszenie/:id', controller.get_by_id);

