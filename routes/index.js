const routes = require('express').Router();
const baseController = require('../controllers/baseController');

routes.get('/', baseController.getName);

module.exports = routes;