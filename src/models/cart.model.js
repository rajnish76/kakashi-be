const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const CartItemSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
    price: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'Not processed',
      enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('CartItem', CartItemSchema);

const CartSchema = mongoose.Schema(
  {
    products: [CartItemSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

// add plugin that converts mongoose to json
CartSchema.plugin(toJSON);

/**
 * @typedef Cart
 */
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
