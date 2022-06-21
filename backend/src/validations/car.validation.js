/* eslint-disable prettier/prettier */
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCar = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        typeCar: Joi.string().required(),
        supplier: Joi.string().required(),
        cost: Joi.number().required(),
        description: Joi.string(),
        thumbnail: Joi.string().required(),
        code: Joi.string().required(),
    }),
};

const getCar = {
    params: Joi.object().keys({
        carId: Joi.string().custom(objectId),
    }),
};

const updateCar = {
    params: Joi.object().keys({
        carId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string().required(),
            typeCar: Joi.string().required(),
            supplier: Joi.string().required(),
            cost: Joi.number().required(),
            description: Joi.string(),
            thumbnail: Joi.string().required(),
            slide: Joi.array(),
        })
        .min(1),
};

const deleteCar = {
    params: Joi.object().keys({
        carId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createCar,
    getCar,
    updateCar,
    deleteCar,
};