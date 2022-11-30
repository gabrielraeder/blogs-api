const { BlogPost, PostCategory, sequelize } = require('../models');
const { verifyToken } = require('../auth/jwtFunctions');
const { categoryIdExists } = require('./validations/inputValidations');

const addPost = async ({ title, content, categoryIds }, token) => {
  const idCheck = await categoryIdExists(categoryIds);
  if (!idCheck) return { type: 'NOT_FOUND', message: 'one or more "categoryIds" not found' };
  try {
    const { data: { id } } = verifyToken(token);
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create({ title, content, userId: id }, { transaction: t });
      const postId = newPost.dataValues.id;
      const mapCatIDS = categoryIds
        .map((categoryId) => PostCategory.create({ postId, categoryId }, { transaction: t }));
      await Promise.all(mapCatIDS);
      return newPost;
    });
    return { type: null, message: result };
  } catch (e) {
    console.log(e);
    throw e; 
  }
};

module.exports = {
  addPost,
};