const dashboardController = require('./dashboard.controller');

const dashboardRouter = require('express').Router();

dashboardRouter.get('/stats', dashboardController.getDashboardStats);
dashboardRouter.get('/users', dashboardController.getAllUsers);

module.exports = dashboardRouter;