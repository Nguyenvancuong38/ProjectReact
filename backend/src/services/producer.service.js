/* eslint-disable prettier/prettier */
const { Car } = require('../models');

const getAllProducer = async () => {
    const producers = await Car.find().distinct('supplier');
    return producers;
};

module.exports = { getAllProducer };