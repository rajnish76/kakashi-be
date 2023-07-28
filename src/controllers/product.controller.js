const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

const addProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(httpStatus.CREATED).send({ s: true, product });
});

const getProducts = catchAsync(async (req, res) => {
  const productList = await Product.find({}).populate({
    path: 'Category',
  });
  if (!productList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Products not found');
  }
  res.send({ s: true, productList });
});

const getProductById = catchAsync(async (req, res) => {
  const product = await Product.find(req.params.id).populate({
    path: 'Category',
  });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send({ s: true, product });
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.userId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send({ s: true, product });
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.userId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  res.status(httpStatus.NO_CONTENT).send({ s: true });
});

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
