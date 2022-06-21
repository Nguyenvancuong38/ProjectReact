/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
const catchAsync = require('../utils/catchAsync');
// const { sidebarService } = require('../services');

const getSidebar = catchAsync(async (req) => {
    console.log(req.body);
    // const sidebar = await sidebarService.getAllSidebar(req.body);
    // res.send(sidebar);
});

module.exports = { getSidebar };