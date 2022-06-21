/* eslint-disable prettier/prettier */
const express = require('express');

const sidebarController = require('../../controllers/sidebar.controller');

const router = express.Router();

router.route('/').get(sidebarController.getSidebar);

module.exports = router;