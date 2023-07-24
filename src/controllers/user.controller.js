const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { User } = require('../models');

const register = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  res.status(httpStatus.CREATED).send({ user });
});

module.exports = {
  register,
};

// const getUser = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });
