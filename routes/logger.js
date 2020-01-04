//importing instances of controllers funtions
var controller = require('../controllers/logger');

//importing app instance
var app = require('../app');

app.app.get('/api/logger/login/:login/:password',controller.login);

app.app.delete('/api/logger/logout/:login',controller.logout);

app.app.delete('/api/logger/remove', controller.remove_user);

app.app.get('/api/logger/validate/:login',controller.validate);

app.app.post('/api/logger/register', controller.register);

