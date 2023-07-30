const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { User } = require('../models');

const register = catchAsync(async (req, res) => {
  let user = await User.find({ userId: req.params.id });
  if (!user) {
    user = await User.create(req.body);
    return res.status(httpStatus.CREATED).send({ s: true, user });
  }
  return res.send({ s: true, user });
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
