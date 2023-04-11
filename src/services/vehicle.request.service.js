const httpStatus = require('http-status');
const { VehicleRequest } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUserRequest = async (userBody, filter, options) => {
  const getVehicle = await VehicleRequest.paginate(filter, options);
  const getRequestVehicle = getVehicle.results.filter(
    (data) =>
      data.user_id === userBody.user_id &&
      data.vehicle_id === userBody.vehicle_id &&
      data.is_Deleted === false &&
      data.accepted === false
  );
  if (getRequestVehicle.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You have already sent Request!');
  }
  const userVehicleRequest = await VehicleRequest.create(userBody);

  return userVehicleRequest;
};

const getRequestById = async (id, filter, options) => {
  const requestById = await VehicleRequest.paginate(filter, options);

  const getRequest = requestById.results.filter((data) => data.registeredOwner_id === id && data.is_Deleted === false);
  requestById.results = getRequest;

  return requestById;
};

const getCustomerRequest = async (req, filter, options) => {
  const customerRequest = await VehicleRequest.paginate(filter, options);
  const updatedCustomerRequest = customerRequest.results.filter(
    (data) => data.user_id === req.user_id && data.booking_type === req.booking_type && data.is_Deleted === false
  );
  customerRequest.results = updatedCustomerRequest;
  return customerRequest;
};

const DeleteRequest = async (data) => {
  if (data.booking_type === 'vehicle') {
    const updateBookingRequest = await VehicleRequest.findOneAndUpdate(
      { _id: data.booking_id, is_Deleted: false },
      { $set: { is_Deleted: true } }
    );
    if (!updateBookingRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle Request is not found');
    }
    return { updateBookingRequest };
  }
  if (data.booking_type === 'driver') {
    const updateBookingRequest = await VehicleRequest.findOneAndUpdate(
      { _id: data.booking_id, is_Deleted: false },
      { $set: { is_Deleted: true } }
    );
    if (!updateBookingRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Driver Request is not found');
    }
    return { updateBookingRequest };
  }
};

module.exports = {
  createUserRequest,
  getRequestById,
  getCustomerRequest,
  DeleteRequest,
};
