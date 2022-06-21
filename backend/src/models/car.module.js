/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  typeCar: {
    type: String,
    required: true
  },
  supplier: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true,
  },
  slide: [
    {
      type: String
    }
  ],
  description: {
    type: String,
  },
  createAt: {
    type: Date,
  },

});

carSchema.plugin(toJSON);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
