const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const vehicleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    numberPlate: {
      type: String,
      required: true,
      trim: true,
    },
    modelYear: {
      type: String,
      required: true,
      trim: true,
    },
    transmission: {
      type: String,
      required: true,
      trim: true,
    },
    perDayPrice: {
      type: Number,

      trim: true,
    },
    luggageCapacity: {
      type: Number,

      trim: true,
    },
    photoUrl: {
      type: String,
      required: true,
      trim: true,
    },
    fromCity: {
      type: String,
      required: true,
      trim: true,
    },
    toCity: {
      type: String,

      trim: true,
    },
    vehicleType: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,

      trim: true,
    },
    ratings: {
      type: Number,
      required: true,
      trim: true,
    },
    registeredOwner_id: {
      type: String,

      trim: true,
    },
    booked: {
      type: Boolean,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

vehicleSchema.plugin(toJSON);
vehicleSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

vehicleSchema.statics.isnumberValid = async function (number, excludeUserId) {
  const vehicle = await this.findOne({ number, _id: { $ne: excludeUserId } });
  return !!vehicle;
};

/**
 * @typedef Vehicle
 */
const Vehicle = mongoose.model('Vehicle Details', vehicleSchema);

module.exports = Vehicle;
