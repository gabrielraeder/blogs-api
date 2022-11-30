const express = require('express');
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const postMiddleware = require('../middlewares/postFields.middleware');

const router = express.Router();

router.post('/', postMiddleware, authMiddleware, postController.addPost);
router.get('/', authMiddleware, postController.getAll);
router.get('/:id', authMiddleware, postController.getById);

module.exports = router;