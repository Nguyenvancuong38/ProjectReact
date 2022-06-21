/* eslint-disable prettier/prettier */
const express = require('express');
const validate = require('../../middlewares/validate');
const carValidation = require('../../validations/car.validation');
const carController = require('../../controllers/car.controller');

const router = express.Router();

router
    .route('/')
    .get(carController.search)
    .post(carController.uploadThumbnail, carController.createCar);

router
    .route('/:carId')
    .patch(carController.uploadFiles, carController.updateCar)
    .get(validate(carValidation.getCar), carController.getACar)
    .delete(validate(carValidation.deleteCar), carController.deleteCar);

module.exports = router;