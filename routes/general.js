//importing instances of controllers funtions
var controller = require('../controllers/general');

//importing app instance
var app = require('../app');

app.app.get('/api/general/get_advertisement_info', controller.get_advertisements_info);

app.app.get('/api/general/get_advertisement_info/:id', controller.get_advertisement_info);

app.app.get('/api/general/get_deadline_of_advertisement/:id', controller.get_deadline_info);

app.app.get('/api/general/get_animals_of_user/:id', controller.get_animals_of_user);

app.app.get('/api/general/get_animals_of_advertisement/:id', controller.get_animals_of_advertisement);

app.app.get('/api/general/get_advertisements_of_user/:id', controller.get_advertisements_of_user);

app.app.get('/api/general/get_offers_of_advertisement/:id',controller.get_offers_of_advertisement);

app.app.get('/api/general/get_offers_to_user/:id', controller.get_offers_to_user);

