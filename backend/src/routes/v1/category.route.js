/* eslint-disable prettier/prettier */
const express = require('express');

const categoryController = require('../../controllers/category.controller');

const router = express.Router();

router.route('/').get(categoryController.getAllCategory);

module.exports = router;
