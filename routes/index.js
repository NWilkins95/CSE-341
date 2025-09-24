const routes = require('express').Router();
const baseController = require('../controllers/baseController');

routes.get('/', baseController.getName);
routes.use('/contacts', require('./contacts'));

module.exports = routes;