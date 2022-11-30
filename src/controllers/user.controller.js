const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);
  if (token.type) return res.status(400).json({ message: token.message });
  return res.status(200).json(token);
};

const createUser = async (req, res) => {
  const data = req.body;
  const { type, message, token } = await userService.createUser(data);
  if (type === 'USER_EXISTS') return res.status(409).json({ message });
  if (type) return res.status(400).json({ message });
  res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const allUsers = await userService.getAll();
  return res.status(200).json(allUsers);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  login,
  createUser,
  getAll,
  getById,
};