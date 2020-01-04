//importing instances of controllers funtions
var controller = require('../controllers/opieka');

//importing app instance
var app = require('../app');

app.app.get('/api/opieka', controller.get_all);

app.app.get('/api/opieka/:id', controller.get_by_id);

