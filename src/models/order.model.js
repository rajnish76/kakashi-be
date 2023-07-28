const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    OrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
