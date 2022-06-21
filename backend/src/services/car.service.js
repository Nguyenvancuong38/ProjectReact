/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable radix */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { Car } = require('../models');
const ApiError = require('../utils/ApiError');

const createCar = async (carBody) => {
    const car = await Car.create(carBody);
    return car;
};

const getAllCar = async () => {
    const cars = await Car.find();
    return cars;
};

const getCarById = async (id) => {
    const car = Car.findById(id)
    return car;
};

const getCarRelate = async (typeCar) => {
    let query = Car.find({})
    query = query.where('typeCar', typeCar)
    const carList = await Car.find(query).select().limit(4);
    return carList;
};

const updateCarById = async (carId, updateBody) => {
    // console.log(updateBody);
    const car = await getCarById(carId);
    if (!car) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Car not found');
    }
    Object.assign(car, updateBody);
    const data = await car.save();
    return data;
};

const deleteCarById = async (carId) => {
    const car = await Car.findByIdAndRemove(carId);
    return car;
};

const searchCar = async (cate, supplier, searchValue, currentPage, pageSize) => {
    // select * from Product
    let query = Car.find({});
    if (cate) {
        // {
        //   $and : [ ],
        //   $or
        // }
        query = query.where('typeCar', cate);
    }

    if (supplier) {
        query = query.where('supplier', supplier);
    }

    if (searchValue) {
        query = query.where({ 'name': { $regex: '.*' + searchValue + '.*' } });
    }

    const total = await Car.find(query).select().countDocuments();

    const data = await Car.find(query).select().sort([['createAt', 'descending']]).skip(parseInt(currentPage - 1) * parseInt(pageSize)).limit(parseInt(pageSize));

    return { data, total };
};

module.exports = {
    createCar,
    getAllCar,
    getCarById,
    updateCarById,
    deleteCarById,
    searchCar,
    getCarRelate,
};