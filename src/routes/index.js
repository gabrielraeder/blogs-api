const express = require('express');
const loginRoutes = require('./login.route');
const userRoutes = require('./user.route');
const categoryRoutes = require('./category.route');

const router = express.Router();

router.use('/login', loginRoutes);
router.use('/user', userRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;