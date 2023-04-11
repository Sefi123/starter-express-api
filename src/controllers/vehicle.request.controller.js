const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { vehicleRequestService } = require('../services');

const createRequest = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const user = await vehicleRequestService.createUserRequest(req.body, filter, options);
  res.status(httpStatus.CREATED).send(user);
});

const getRequests = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const requests = await vehicleRequestService.getRequestById(req.body.registeredOwner_id, filter, options);
  res.status(httpStatus.CREATED).send(requests);
});

const getCustomerRequests = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const requests = await vehicleRequestService.getCustomerRequest(req.body, filter, options);
  res.status(httpStatus.CREATED).send(requests);
});

const deleteCustomerRequests = catchAsync(async (req, res) => {
  const requests = await vehicleRequestService.DeleteRequest(req.body);
  res.status(httpStatus.CREATED).send(requests);
});

module.exports = {
  createRequest,
  getRequests,
  getCustomerRequests,
  deleteCustomerRequests,
};
