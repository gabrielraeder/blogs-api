const { User } = require('../models');
const { createToken } = require('../auth/jwtFunctions');
const validations = require('./validations/inputValidations');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) return { type: 'INVALID_FIELDS', message: 'Invalid fields' };
  const { password: _password, ...userWithoutPassword } = user.dataValues;
  const token = createToken(userWithoutPassword);
  return { token };
};

const createUser = async (data) => {
  const fieldsCheck = validations.createUserValidations(data);
  if (fieldsCheck.type) return fieldsCheck;
  const user = await User.findOne({ where: { email: data.email } });
  if (user) return { type: 'USER_EXISTS', message: 'User already registered' };

  const newUser = await User.create(data);
  const { password: _password, ...userWithoutPassword } = newUser.dataValues;
  const token = createToken(userWithoutPassword);
  return { type: null, token };
};

const getAll = async () => {
  const users = await User.findAll();
  const usersWithoutPass = users.map(({ dataValues }) => {
    const { password: _password, ...userWithoutPassword } = dataValues;
    return userWithoutPassword;
  });
  console.log(usersWithoutPass);
  return usersWithoutPass;
};

module.exports = {
  login,
  createUser,
  getAll,
};