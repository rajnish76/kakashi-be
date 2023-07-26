const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Product } = require('../models');

const addProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(httpStatus.CREATED).send({ s: true, product });
});

module.exports = {
  addProduct,
};
