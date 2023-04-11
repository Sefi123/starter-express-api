const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createVehicle = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    numberPlate: Joi.string().required(),
    modelYear: Joi.string().required(),
    transmission: Joi.string().required(),
    perDayPrice: Joi.number(),
    luggageCapacity: Joi.number(),
    photoUrl: Joi.string().required(),
    fromCity: Joi.string().required(),
    toCity: Joi.string(),
    vehicleType: Joi.string().required(),
    color: Joi.string(),
    ratings: Joi.number().required(),
    registeredOwner_id: Joi.string(),
    booked: Joi.boolean().required(),
  }),
};

const getVehiclesById = {
  body: Joi.object().keys({
    registeredOwner_id: Joi.string().required(),
  }),
};

const getVehicles = {
  query: Joi.object().keys({
    name: Joi.string(),
    numberPlate: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    vehicleType: Joi.string(),
  }),
};

const deleteVehicle = {
  body: Joi.object().keys({
    vehicle_id: Joi.string(),
    registeredOwner_id: Joi.string(),
  }),
};

const bookRequest = {
  body: Joi.object().keys({
    booking_id: Joi.string(),
    booking_type: Joi.string(),
    vehicle_id: Joi.string(),
    registeredOwner_id: Joi.string(),
  }),
};

const makeAvailable = {
  body: Joi.object().keys({
    vehicle_id: Joi.string(),
    registeredOwner_id: Joi.string(),
    booking_type: Joi.string(),
  }),
};

const updateVehicle = {
  params: Joi.object().keys({
    vehicleId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    numberPlate: Joi.string().required(),
    modelYear: Joi.string().required(),
    transmission: Joi.string().required(),
    perDayPrice: Joi.number(),
    luggageCapacity: Joi.number(),
    photoUrl: Joi.string().required(),
    fromCity: Joi.string().required(),
    toCity: Joi.string(),
    vehicleType: Joi.string().required(),
    color: Joi.string(),
    ratings: Joi.number().required(),
    registeredOwner_id: Joi.string(),
    booked: Joi.boolean().required(),
  }),
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehiclesById,
  deleteVehicle,
  bookRequest,
  makeAvailable,
  updateVehicle,
};
