const { User } = require('../models');
const { createToken } = require('../auth/jwtFunctions');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) return { type: 'INVALID_FIELDS', message: 'Invalid fields' };
  const { password: _password, ...userWithoutPassword } = user.dataValues;
  const token = createToken(userWithoutPassword);
  return { token };
};

module.exports = {
  login,
};