const { Category } = require('../models');

const addCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory.dataValues;
};

const getAll = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

module.exports = {
  addCategory,
  getAll,
};