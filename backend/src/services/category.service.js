/* eslint-disable prettier/prettier */
const { Car } = require('../models');

const getAllCategory = async () => {
    const categories = await Car.find().distinct('typeCar');
    return categories;
};

module.exports = { getAllCategory };