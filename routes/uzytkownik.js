//importing instances of controllers funtions
var controller = require('../controllers/uzytkownik');

//importing app instance
var app = require('../app');

app.app.get('/api/uzytkownik', controller.get_all);

app.app.get('/api/uzytkownik/:id', controller.get_by_id);

