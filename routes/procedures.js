//importing instances of controllers funtions
var controller = require('../controllers/procedures');

//importing app instance
var app = require('../app');

app.app.get('/api/db_procedure/:procedure_param',controller.get_db_procedure);