const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userRequestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    user_id: {
      type: String,
      trim: true,
      lowercase: true,
    },
    cnic: {
      type: String,
      trim: true,
      minlength: 13,
      maxlength: 13,
    },
    vehicle_id: {
      type: String,
      trim: true,
    },
    vehicle_name: {
      type: String,
      trim: true,
    },

    phone_no: {
      type: String,

      trim: true,
    },

    fromCity: {
      type: String,
      trim: true,
    },
    toCity: {
      type: String,
      trim: true,
    },

    dateIn: {
      type: Date,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    dateOut: {
      type: Date,
      trim: true,
    },
    registeredOwner_id: {
      type: String,
      trim: true,
    },
    driver_name: {
      type: String,
      trim: true,
    },
    numberPlate: {
      type: String,
      trim: true,
    },
    perDayPrice: {
      type: Number,
      trim: true,
    },
    modelYear: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
    experience: {
      type: Number,
      trim: true,
    },
    booking_type: {
      type: String,
      trim: true,
    },
    accepted: {
      type: Boolean,
      trim: true,
      default: false,
    },
    is_Released: {
      type: Boolean,
      trim: true,
      default: false,
    },
    is_Deleted: {
      type: Boolean,
      trim: true,
      default: false,
      private: true,
    },
    is_Rejected: {
      type: Boolean,
      trim: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set('useFindAndModify', false);

// add plugin that converts mongoose to json
userRequestSchema.plugin(toJSON);
userRequestSchema.plugin(paginate);

/**
 * @typedef User
 */
const UserRequest = mongoose.model('User Booking Request', userRequestSchema);

module.exports = UserRequest;
