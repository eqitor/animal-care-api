//importing instances of controllers funtions
var controller = require('../controllers/oferta');

//importing app instance
var app = require('../app');

app.app.get('/api/oferta', controller.get_all);

app.app.get('/api/oferta/:id', controller.get_by_id);

