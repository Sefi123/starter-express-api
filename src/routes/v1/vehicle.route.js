const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const vehicleValidation = require('../../validations/vehicle.validation');
const vehicleController = require('../../controllers/vehicle.controller');

const router = express.Router();

router.route('/register').post(auth(), validate(vehicleValidation.createVehicle), vehicleController.createVehicle);

// router.route('/get_vehicles').get(auth(), validate(vehicleValidation.getVehicles), vehicleController.getVehicles);

router.route('/get_vehicles').post(validate(vehicleValidation.getVehicles), vehicleController.getVehicles);
router
  .route('/get_vehicles_by_id')
  .post(auth(), validate(vehicleValidation.getVehiclesById), vehicleController.getVehiclesById);
router.route('/delete_vehicle').post(auth(), validate(vehicleValidation.deleteVehicle), vehicleController.deleteVehicle);
router.route('/post_accept_booking').post(validate(vehicleValidation.bookRequest), vehicleController.requestAccept);
router
  .route('/make_vehicle_available')
  .post(auth(), validate(vehicleValidation.makeAvailable), vehicleController.vehicleAvailable);
router
  .route('/reject_Request')
  .post(auth(), validate(vehicleValidation.bookRequest), vehicleController.vehicleRequestReject);
router
  .route('/vehicle_release')
  .post(auth(), validate(vehicleValidation.bookRequest), vehicleController.bookedVehicleReleased);

router.route('/update_vehicle').post(auth(), validate(vehicleValidation.updateVehicle), vehicleController.updateVehicle);
module.exports = router;
