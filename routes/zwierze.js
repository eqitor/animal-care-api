//importing instances of controllers funtions
var controller = require('../controllers/zwierze');

//importing app instance
var app = require('../app');

app.app.get('/api/zwierze', controller.get_all);

app.app.get('/api/zwierze/:id', controller.get_by_id);

app.app.delete('/api/zwierze/:id', controller.delete_by_id);

app.app.post('api/zwierze', controller.add);

app.app.get('api/zwierze/uzytkownik/:id', controller.get_by_user);