/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();
const producerController = require('../../controllers/producer.controller');


router.route('/').get(producerController.getAllProducer);

module.exports = router;
