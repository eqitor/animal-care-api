//importing instances of controllers funtions
var controller = require('../controllers/general');

//importing app instance
var app = require('../app');

app.app.get('/api/get_all_advertisements', controller.get_all_advertisements);