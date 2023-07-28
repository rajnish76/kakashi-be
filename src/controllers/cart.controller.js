const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Cart, Product } = require('../models');
const ApiError = require('../utils/ApiError');

const decreaseQuantity = async (products) => {
  const bulkOptions = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { quantity: -item.quantity } },
      },
    };
  });

  await Product.bulkWrite(bulkOptions);
};

const addCart = catchAsync(async (req, res) => {
  const products = [
    {
      productId: req.body.productId,
      quantity: req.body.quantity || 1,
    },
  ];

  const cart = await Cart.create({ userId: req.userId, products });
  await decreaseQuantity(products);
  res.status(httpStatus.CREATED).send({ s: true, cart });
});

const deleteCartById = catchAsync(async (req, res) => {
  const cart = await Cart.findById(req.params.userId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  await cart.remove();
  res.status(httpStatus.NO_CONTENT).send({ s: true });
});

const addProductToCart = catchAsync(async (req, res) => {
  const products = [
    {
      productId: req.body.productId,
      quantity: req.body.quantity || 1,
    },
  ];
  await Cart.updateOne({ _id: req.params.cartId }, { $push: { products } });
  res.status(httpStatus['200_MESSAGE']).send({ s: true });
});

const removeProductFromCart = catchAsync(async (req, res) => {
  await Cart.updateOne({ _id: req.params.cartId }, { $pull: { products: { productId: req.params.productId } } });
  res.status(httpStatus.NO_CONTENT).send({ s: true });
});

module.exports = {
  addCart,
  deleteCartById,
  addProductToCart,
  removeProductFromCart,
};
