/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import axiosInstance from './axios';

const API_URL_CAR = 'http://localhost:5000/v1/cars/';
const API_URL_CATEGORY = 'http://localhost:5000/v1/category/';
const API_URL_SIDEBAR = 'http://localhost:5000/v1/sidebar/';
const API_URL_PRODUCER = 'http://localhost:5000/v1/producer/';

export const getAllCar = async (cate, sup, searchValue, currentPage, pageSize) => {
    if (!cate || cate === 'Tất cả') cate = '';
    if (!sup || sup === 'Tất cả') sup = '';
    if (!pageSize) pageSize = 6;
    if (!currentPage) currentPage = 1;
    if (!searchValue) searchValue = '';
    const carList = await axiosInstance.get(`${API_URL_CAR}?cate=${cate}&sup=${sup}&searchValue=${searchValue}&currentPage=${currentPage}&pageSize=${pageSize}`);
    return carList;
};

export const getAllCategory = async () => {
    const categoryList = await axiosInstance.get(`${API_URL_CATEGORY}`);
    return categoryList;
};

export const getAllProducer = async () => {
    const producerList = await axiosInstance.get(`${API_URL_PRODUCER}`);
    return producerList;
};

export const getSidebar = async (currentTypeCar) => {
    if (!currentTypeCar || currentTypeCar === '') currentTypeCar = 'Tất cả';
    const { typeCar, producer } = await axiosInstance.get(`${API_URL_SIDEBAR}${currentTypeCar}`);
    return { typeCar, producer };
};

export const getCarById = async (id) => {
    const { car, carRelate } = await axiosInstance.get(`${API_URL_CAR}${id}`);
    return { car, carRelate };
};

export const deleteCar = async (id) => {
    const message = await axiosInstance.delete(`${API_URL_CAR}${id}`);
    return message;
};

export const createCar = async (formData) => {
    const data = await axiosInstance.post(API_URL_CAR, formData);
    return data;
};

export const updateCar = async (id, formData) => {
    const data = await axiosInstance.patch(`${API_URL_CAR}${id}`, formData);
    return data;
};
