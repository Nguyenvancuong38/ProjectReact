/* eslint-disable prettier/prettier */
// const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { producerService } = require('../services');

const getAllProducer = catchAsync(async (req, res) => {
    const producers = await producerService.getAllProducer(req.body);
    res.send(producers);
});

module.exports = { getAllProducer };