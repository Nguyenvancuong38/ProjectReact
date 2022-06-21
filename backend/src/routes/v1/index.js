const express = require('express');
const authRoute = require('./auth.route');
const carRoute = require('./car.route');
const categoryRoute = require('./category.route');
const sidebarRoute = require('./sidebar.route');
const producerRoute = require('./producer.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/cars',
    route: carRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/producer',
    route: producerRoute,
  },
  {
    path: '/sidebar',
    route: sidebarRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
