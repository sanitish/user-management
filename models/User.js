const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  mobileNumber: {
    type: String,
    required: [true, 'Please add a valid mobile number'],
    unique: true,
  },

  age: {
    type: String,
    required: [true],
  },
  email: {
    type: String,
    required: [false, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('User', UserSchema);
