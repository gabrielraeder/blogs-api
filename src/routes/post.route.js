const express = require('express');
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const postMiddleware = require('../middlewares/postFields.middleware');
const postUpdateMiddleware = require('../middlewares/postUpdate.middleware');

const router = express.Router();

router.post('/', postMiddleware, authMiddleware, postController.addPost);
router.get('/', authMiddleware, postController.getAll);
router.get('/:id', authMiddleware, postController.getById);
router.put('/:id', authMiddleware, postUpdateMiddleware, postController.update);

module.exports = router;