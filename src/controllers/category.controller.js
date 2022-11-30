const categoryService = require('../services/category.service');

const addCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = await categoryService.addCategory(name);
  return res.status(201).json(newCategory);
};

const getAll = async (_req, res) => {
  const allCategories = await categoryService.getAll();
  return res.status(200).json(allCategories);
};

module.exports = {
  addCategory,
  getAll,
};