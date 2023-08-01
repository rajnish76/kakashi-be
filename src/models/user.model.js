const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;

// https://github.com/hagopj13/node-express-boilerplate/tree/master
// https://github.com/yuvi76/nodejs-ecommerce/blob/main/index.js
