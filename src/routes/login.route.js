const express = require('express');
const loginController = require('../controllers/user.controller');
const loginFieldsMiddleware = require('../middlewares/loginFields.middleware');

const router = express.Router();

router.post('/', loginFieldsMiddleware, loginController.login);

module.exports = router;