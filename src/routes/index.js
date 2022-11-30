const express = require('express');
const loginRoutes = require('./login.route');
const userRoutes = require('./user.route');

const router = express.Router();

router.use('/login', loginRoutes);
router.use('/user', userRoutes);

module.exports = router;