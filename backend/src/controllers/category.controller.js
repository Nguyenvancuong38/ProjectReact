/* eslint-disable prettier/prettier */
// const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const getAllCategory = catchAsync(async (req, res) => {
    const categories = await categoryService.getAllCategory(req.body);
    res.send(categories);
});

module.exports = { getAllCategory };