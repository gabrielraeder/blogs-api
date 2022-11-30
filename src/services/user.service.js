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

module.exports = {
  login,
  createUser,
};