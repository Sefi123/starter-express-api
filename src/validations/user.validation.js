const Joi = require('joi').extend(require('@joi/date'));
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    phone_no: Joi.string(),
    city: Joi.string(),
    user_type: Joi.string(),
    photoUrl: Joi.string(),
    role: Joi.string().required().valid('user', 'admin'),
    experience: Joi.number(),
    age: Joi.number(),
    perDayPrice: Joi.number(),
    content: Joi.string(),
    address: Joi.string(),
    cnic: Joi.string(),
    driver_type: Joi.string(),
    license_number: Joi.string(),
    drive_experience: Joi.number(),
    booked: Joi.boolean(),
    expiry_date: Joi.date().format('YYYY/MM/DD').utc(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDrivers = {
  body: Joi.object().keys({
    user_type: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      phone_no: Joi.string(),
      city: Joi.string(),
      user_type: Joi.string(),
      photoUrl: Joi.string(),
      role: Joi.string().required().valid('user', 'admin'),
      experience: Joi.number(),
      age: Joi.number(),
      perDayPrice: Joi.number(),
      content: Joi.string(),
      address: Joi.string(),
      cnic: Joi.string(),
      driver_type: Joi.string(),
      license_number: Joi.string(),
      drive_experience: Joi.number(),
      booked: Joi.boolean(),
      expiry_date: Joi.date().format('YYYY/MM/DD').utc(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const userRequest = {
  body: Joi.object().keys({
    user_id: Joi.string(),
    name: Joi.string(),
    cnic: Joi.string(),
    phone_no: Joi.string(),
    fromCity: Joi.string(),
    toCity: Joi.string(),
    vehicle_id: Joi.string(),
    vehicle_name: Joi.string(),
    perDayPrice: Joi.number(),
    numberPlate: Joi.string(),
    modelYear: Joi.string(),
    driver_name: Joi.string(),
    address: Joi.string(),
    booking_type: Joi.string(),
    age: Joi.number(),
    experience: Joi.number(),
    accepted: Joi.boolean(),
    dateIn: Joi.date().format('YYYY/MM/DD').utc(),
    dateOut: Joi.date().format('YYYY/MM/DD').utc(),
    registeredOwner_id: Joi.string(),
  }),
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    limit: Joi.string(),
  }),
};

const deleteRequest = {
  body: Joi.object().keys({
    booking_id: Joi.string(),
    booking_type: Joi.string(),
  }),
};

const contactUs = {
  body: Joi.object().keys({
    name: Joi.string(),
    user_id: Joi.string(),
    email: Joi.string(),
    subject: Joi.string(),
    message: Joi.string(),
  }),
};

const getRequestById = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    limit: Joi.string(),
  }),
};

const getCustomerRequest = {
  body: Joi.object().keys({
    user_id: Joi.string(),
    booking_type: Joi.string(),
  }),
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    limit: Joi.string(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getDrivers,
  userRequest,
  getRequestById,
  getCustomerRequest,
  deleteRequest,
  contactUs,
};
