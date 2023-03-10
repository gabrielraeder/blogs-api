const { Op } = require('sequelize');
const { BlogPost, PostCategory, sequelize, User, Category } = require('../models');
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

const getAll = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });
  return allPosts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });
  if (!post) return { type: 'NOT_FOUND', message: 'Post does not exist' };
  return { type: null, message: post };
};

const update = async (data, id) => {
  const [qtdUpdated] = await BlogPost.update(
    data,
    { where: { id } },
  );
  if (qtdUpdated === 0) return { type: 'NOT_FOUND', message: 'Post does not exist' };
  const updatedPost = await getById(+id);
  return updatedPost;
};

const remove = async (postId) => {
  // const checkIds = await checkUserPermission(postId, userId);
  // if (checkIds.type) return checkIds;

  await BlogPost.destroy({ where: { id: postId } });
  return { type: null, message: '' };
};

const getByQuery = async (q) => {
  if (!q) return getAll();
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.substring]: q } }, { content: { [Op.substring]: q } }],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

module.exports = {
  addPost,
  getAll,
  getById,
  update,
  remove,
  getByQuery,
};