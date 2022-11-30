const { Category } = require('../models');

const addCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory.dataValues;
};

module.exports = {
  addCategory,
};