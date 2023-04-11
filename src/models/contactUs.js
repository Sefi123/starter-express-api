const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON } = require('./plugins');

const contactUsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    user_id: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
contactUsSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const contactUS = mongoose.model('Contact Us', contactUsSchema);

module.exports = contactUS;
