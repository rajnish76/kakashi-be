const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

const addCategory = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(httpStatus.CREATED).send({ s: true, category });
});

const getCategory = catchAsync(async (req, res) => {
  const categoryList = await Category.find({}).populate({
    path: 'products',
    select: 'name',
  });
  if (!categoryList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send({ s: true, categoryList });
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await Category.find(req.params.id).populate({
    path: 'products',
    select: 'name',
  });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send({ s: true, category });
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await Category.findOne({ _id: req.body.id });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  category.set(req.body);
  const updatedCategory = await category.save();
  res.send({ s: true, category: updatedCategory });
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await Category.findById({ _id: req.params.id });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  res.status(httpStatus.NO_CONTENT).send({ s: true });
});

const getCategoryBySlug = catchAsync(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).populate({
    path: 'products',
    select: 'name',
  });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send({ s: true, category });
});

const updateCategoryBySlug = catchAsync(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  category.set(req.body);
  const updatedCategory = await category.save();
  res.send({ s: true, category: updatedCategory });
});

module.exports = {
  addCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryBySlug,
  updateCategoryBySlug,
};
