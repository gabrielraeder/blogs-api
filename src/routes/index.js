const express = require('express');
const loginRoutes = require('./login.route');

const router = express.Router();

router.use('/login', loginRoutes);

module.exports = router;