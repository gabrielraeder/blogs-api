const express = require('express');
const loginRoutes = require('./login.route');
const userRoutes = require('./user.route');
const categoryRoutes = require('./category.route');
const postRoutes = require('./post.route');

const router = express.Router();

router.use('/login', loginRoutes);
router.use('/user', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/post', postRoutes);

module.exports = router;