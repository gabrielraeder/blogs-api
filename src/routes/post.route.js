const express = require('express');
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const postMiddleware = require('../middlewares/postFields.middleware');

const router = express.Router();

router.post('/', postMiddleware, authMiddleware, postController.addPost);

module.exports = router;