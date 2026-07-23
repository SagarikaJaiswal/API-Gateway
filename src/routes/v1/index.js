const express = require('express');

const { InfoController } = require('../../controllers');
const userRoutes = require('./user-routes');

const v1Router = express.Router();

v1Router.get('/info', InfoController.info);
v1Router.use('/users', userRoutes);

module.exports = v1Router;