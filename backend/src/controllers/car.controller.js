/* eslint-disable no-useless-return */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const multer = require('multer');
const { Car } = require('../models');
const catchAsync = require('../utils/catchAsync');
const { carService } = require('../services');

const getAllCar = catchAsync(async (req, res) => {
    const cars = await carService.getAllCar(req.body);
    res.send(cars);
});

const getACar = catchAsync(async (req, res) => {
    const car = await carService.getCarById(req.params.carId);
    const carList = await carService.getCarRelate(car.typeCar);
    const carRelate = carList.filter(item => item.id !== car.id);
    if (carRelate.length > 3) carRelate.pop();
    res.send({ car, carRelate });
});

const deleteCar = catchAsync(async (req, res) => {
    await carService.deleteCarById(req.params.carId);
    res.status(httpStatus.NO_CONTENT).send();
});

const search = catchAsync(async (req, res) => {
    const { cate, sup, searchValue, currentPage, pageSize } = req.query;
    const { data, total } = await carService.searchCar(cate, sup, searchValue, currentPage, pageSize);
    res.send({ data, total }).status(httpStatus.NO_CONTENT);
});

const DIR = 'public';


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, DIR);
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    },
});

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error('only Image Allowed...'));
    }
}

const upload = multer({ storage: storage, fileFilter: isImage });

const uploadThumbnail = upload.single('thumbnail');
const uploadFiles = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'slide', maxCount: 4 }]);

const createCar = catchAsync(async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const car = {
        name: req.body.name,
        typeCar: req.body.typeCar,
        supplier: req.body.supplier,
        cost: req.body.cost,
        thumbnail: url + '/' + req.file.filename,
        description: req.body.description,
        slide: ['', '', '', ''],
        createAt: Date.now(),
    }
    const returnCar = await carService.createCar(car);
    res.status(httpStatus.CREATED).send(returnCar);
})

const updateCar = catchAsync(async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const carDB = await Car.findById(req.params.carId);
    const slideUploadURL = [];

    const addThumbnail = () => {
        if (req.files.thumbnail) {
            return url + '/' + req.files.thumbnail[0].filename
        }
        return carDB.thumbnail;
        ;
    }

    let indexSlideFile = 0;
    for (let i = 0; i < 4; i += 1) {
        if (req.body.indexSlide[i] === 'exit') {
            slideUploadURL.push(url + '/' + req.files.slide[indexSlideFile].filename)
            indexSlideFile += 1;
        }
        else {
            slideUploadURL.push('');
        }
    }

    const addSlide = () => {
        const slideUpdate = ['', '', '', ''];
        for (let i = 0; i < 4; i += 1) {
            if (req.body.saveDelete[i] === 'delete') {
                if (slideUploadURL[i] !== '') {
                    console.log(slideUploadURL[i]);
                    slideUpdate[i] = slideUploadURL[i];
                }
                else {
                    slideUpdate[i] = '';
                }
            }
            else {
                if (slideUploadURL[i] !== '') {
                    slideUpdate[i] = slideUploadURL[i];
                }
                else {
                    slideUpdate[i] = carDB.slide[i];
                };
            }
        }
        return slideUpdate;
    }

    const car = {
        name: req.body.name,
        typeCar: req.body.typeCar,
        supplier: req.body.supplier,
        cost: req.body.cost,
        thumbnail: addThumbnail(),
        description: req.body.description,
        slide: addSlide(),
    }

    const dataUpdate = await carService.updateCarById(req.params.carId, car);
    res.status(200).send(dataUpdate);
})


module.exports = {
    createCar,
    getAllCar,
    getACar,
    updateCar,
    deleteCar,
    search,
    uploadThumbnail,
    uploadFiles,
};