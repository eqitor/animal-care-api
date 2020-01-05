//importing instances of controllers funtions
var controller = require('../controllers/views');

//importing app instance
var app = require('../app');


app.app.get('/api/view/:view_param',controller.get_view)