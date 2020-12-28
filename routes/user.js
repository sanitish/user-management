const express = require('express');
const {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser
} = require('../controllers/user');

const User = require('../models/User');
const router = express.Router();


router.get('/getUsers', getUsers);
router.post('/addUser', addUser);
router.get('/getUser/:user', getUser);
router.put('/updateUser/:user', updateUser);
router.delete('/deleteUser/:user', deleteUser);


module.exports = router;