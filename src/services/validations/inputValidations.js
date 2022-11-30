const schemas = require('./schemas');

const createUserValidations = ({ email, displayName, password }) => {
  const emailCheck = schemas.emailSchema.validate(email);
  if (emailCheck.error) return { type: 'INVALID_EMAIL', message: '"email" must be a valid email' };
  
  const displayNameCheck = schemas.displayNameSchema.validate(displayName);
  if (displayNameCheck.error) {
    return { 
      type: 'INVALID_NAME', 
      message: '"displayName" length must be at least 8 characters long', 
    };
  }

  const passwordCheck = schemas.passwordSchema.validate(password);
  if (passwordCheck.error) {
    return { 
      type: 'INVALID_PASSWORD', 
      message: '"password" length must be at least 6 characters long',
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  createUserValidations,
};