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

module.exports = {
  login,
  createUser,
  getAll,
};