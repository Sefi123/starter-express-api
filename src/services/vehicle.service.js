const httpStatus = require('http-status');
const { Vehicle } = require('../models');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const { User } = require('../models');
const { VehicleRequest } = require('../models');

const vehicleCreate = async (vehicleBody) => {
  if (await Vehicle.isnumberValid(vehicleBody.numberPlate)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Vehicle already Registered');
  }
  const vehicle = await Vehicle.create(vehicleBody);

  return vehicle;
};

const queryVehicles = async (filter, options) => {
  const vehicles = await Vehicle.paginate(filter, options);
  return vehicles;
};

const getCars = async (req, filter, options) => {
  const vehicles = await Vehicle.paginate(filter, options);

  const cars = await vehicles.results.filter((data) => data.vehicleType === req.vehicleType);
  vehicles.results = cars;

  return vehicles;
};

const getOwnerVehicles = async (req, filter, options) => {
  const vehicles = await Vehicle.paginate(filter, options);
  const cars = await vehicles.results.filter((data) => data.registeredOwner_id === req.registeredOwner_id);
  vehicles.results = cars;
  return vehicles;
};

const getVehicleById = async (id) => {
  return Vehicle.findById(id);
};

const deleteVehicleById = async (Body) => {
  const filter = pick(Body.query, ['name', 'role', 'numberPlate']);
  const options = pick(Body.query, ['sortBy', 'limit', 'page']);
  const vehicleForDelete = await getVehicleById(Body.vehicle_id);
  if (!vehicleForDelete) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }
  await vehicleForDelete.remove();
  const getUpdatedVehicle = await getOwnerVehicles(Body, filter, options);
  return getUpdatedVehicle;
};

const vehicleBooked = async (data) => {
  // id vehicle_id registeredOwner_id accepted deleted rejected released
  if (data.booking_type === 'vehicle') {
    const bookedVehicle = await Vehicle.findOneAndUpdate({ _id: data.vehicle_id }, { $set: { booked: true } });
    const updateManyVehicle = await VehicleRequest.updateMany(
      { registeredOwner_id: data.registeredOwner_id, vehicle_id: data.vehicle_id, is_Deleted: false },
      { is_Rejected: true }
    );
    const updateBookingRequest = await VehicleRequest.findOneAndUpdate(
      { _id: data.booking_id, is_Deleted: false },
      { $set: { accepted: true, is_Rejected: false } }
    );
    if (!updateBookingRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle Request is not found');
    }
    return { bookedVehicle, updateBookingRequest, updateManyVehicle };
  }
  if (data.booking_type === 'driver') {
    const bookedDriver = await User.findOneAndUpdate({ _id: data.registeredOwner_id }, { $set: { booked: true } });
    const updateManyDriverRequest = await VehicleRequest.updateMany(
      { registeredOwner_id: data.registeredOwner_id, is_Deleted: false },
      { is_Rejected: true }
    );
    const updateBookingRequest = await VehicleRequest.findOneAndUpdate(
      { _id: data.booking_id, is_Deleted: false },
      { $set: { accepted: true, is_Rejected: false } }
    );
    if (!updateBookingRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Driver Request is not found');
    }
    return { bookedDriver, updateBookingRequest, updateManyDriverRequest };
  }
};

const makeAvailable = async (data) => {
  if (data.booking_type === 'vehicle') {
    const bookedVehicle = await Vehicle.findOneAndUpdate({ _id: data.vehicle_id }, { $set: { booked: false } });
    const updateBookingRequest = await VehicleRequest.findOneAndUpdate(
      { registeredOwner_id: data.registeredOwner_id, vehicle_id: data.vehicle_id, is_Deleted: false },
      { $set: { is_Deleted: true } }
    );
    if (!updateBookingRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle Request is not found');
    }
    return { bookedVehicle, updateBookingRequest };
  }
  if (data.booking_type === 'driver') {
    const bookedDriver = await User.findOneAndUpdate({ _id: data.registeredOwner_id }, { $set: { booked: false } });
    const updateBookingRequest = await VehicleRequest.findOneAndUpdate(
      { registeredOwner_id: data.registeredOwner_id, is_Deleted: false },
      { $set: { is_Deleted: true } }
    );
    if (!updateBookingRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Driver Request is not found');
    }
    return { bookedDriver, updateBookingRequest };
  }
};

const vehicleReject = async (data) => {
  if (data.booking_type === 'vehicle') {
    const updateBookingRequest = await VehicleRequest.findOneAndUpdate(
      { _id: data.booking_id, is_Deleted: false },
      { $set: { is_Rejected: true } }
    );
    if (!updateBookingRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle Request is not found');
    }
    return { updateBookingRequest };
  }
  if (data.booking_type === 'driver') {
    const updateBookingRequest = await VehicleRequest.findOneAndUpdate(
      { _id: data.booking_id, is_Deleted: false },
      { $set: { is_Rejected: true } }
    );
    if (!updateBookingRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Driver Request is not found');
    }
    return { updateBookingRequest };
  }
};

const vehicleRelease = async (data) => {
  if (data.booking_type === 'vehicle') {
    const updateBookingRequest = await VehicleRequest.findOneAndUpdate(
      { _id: data.booking_id, is_Deleted: false },
      { $set: { is_Released: true } }
    );
    if (!updateBookingRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle Request is not found');
    }
    return { updateBookingRequest };
  }
  if (data.booking_type === 'driver') {
    const updateBookingRequest = await VehicleRequest.findOneAndUpdate(
      { _id: data.booking_id, is_Deleted: false },
      { $set: { is_Released: true } }
    );
    if (!updateBookingRequest) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Driver Request is not found');
    }
    return { updateBookingRequest };
  }
};

const updateVehicleById = async (vehicleId, updateBody) => {
  const vehicle = await Vehicle.findById(vehicleId);

  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }

  Object.assign(vehicle, updateBody);
  await vehicle.save();
  return vehicle;
};

module.exports = {
  vehicleCreate,
  queryVehicles,
  getCars,
  getOwnerVehicles,
  deleteVehicleById,
  vehicleBooked,
  makeAvailable,
  vehicleReject,
  vehicleRelease,
  updateVehicleById,
};
