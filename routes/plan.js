//importing instances of controllers funtions
var controller = require('../controllers/plan');

//importing app instance
var app = require('../app');

app.app.get('/api/plan', controller.get_all);

app.app.get('/api/plan/:id', controller.get_by_id);

app.app.delete('/api/plan/:id', controller.delete_by_id);

app.app.post('api/plan', controller.add);