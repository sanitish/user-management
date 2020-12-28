const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

exports.getUsers = asyncHandler(async (req, res, next) => {
  const user =  await User.findById(req.params.user);
  if(!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.user}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});




exports.getUser = asyncHandler(async (req, res, next) => {
  const user =  await User.findById(req.params.user);
  if(!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.user}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});


exports.addUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user
  });
});



exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.user).populate('booking');
  console.log('hi', user)
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  user = await User.findOneAndUpdate(req.params.user, req.body, {
    new: true,
    runValidators: true
  });
  console.log(user)
  res.status(200).json({ success: true, data: user });
});


exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.user);
  console.log(user)
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.user}`, 404)
    );
  }
  user.remove();
  res.status(200).json({ success: true, data: {} });
});