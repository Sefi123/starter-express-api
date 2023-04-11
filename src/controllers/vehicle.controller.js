const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');
const { vehicleService } = require('../services');

const createVehicle = catchAsync(async (req, res) => {
  const vehicle = await vehicleService.vehicleCreate(req.body);
  res.status(httpStatus.CREATED).send(vehicle);
});

const getVehiclesById = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'numberPlate']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const vehicle = await vehicleService.getOwnerVehicles(req.body, filter, options);
  res.status(httpStatus.CREATED).send(vehicle);
});

const getVehicles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'numberPlate']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await vehicleService.getCars(req.body, filter, options);
  res.send(result);
});

const deleteVehicle = catchAsync(async (req, res) => {
  const vehicles = await vehicleService.deleteVehicleById(req.body);
  res.status(httpStatus.OK).send(vehicles);
});

const requestAccept = catchAsync(async (req, res) => {
  const bookVehicle = await vehicleService.vehicleBooked(req.body);
  if (!bookVehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found for booking');
  }
  res.status(httpStatus.OK).send(bookVehicle);
});

const vehicleAvailable = catchAsync(async (req, res) => {
  const markAvailable = await vehicleService.makeAvailable(req.body);
  if (!markAvailable) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found for Mark as Available');
  }
  res.status(httpStatus.OK).send(markAvailable);
});

const vehicleRequestReject = catchAsync(async (req, res) => {
  const markReject = await vehicleService.vehicleReject(req.body);
  if (!markReject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found for Reject');
  }
  res.status(httpStatus.OK).send(markReject);
});

const bookedVehicleReleased = catchAsync(async (req, res) => {
  const markReject = await vehicleService.vehicleRelease(req.body);
  if (!markReject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found for Release!');
  }
  res.status(httpStatus.OK).send(markReject);
});

const updateVehicle = catchAsync(async (req, res) => {
  const updateDetail = await vehicleService.updateVehicleById(req.query.vehicleId, req.body);
  if (!updateDetail) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found for update!');
  }
  res.status(httpStatus.OK).send(updateDetail);
});

module.exports = {
  createVehicle,
  getVehicles,
  getVehiclesById,
  deleteVehicle,
  requestAccept,
  vehicleAvailable,
  vehicleRequestReject,
  bookedVehicleReleased,
  updateVehicle,
};
