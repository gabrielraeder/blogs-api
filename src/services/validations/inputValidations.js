const { Category } = require('../../models');
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

const categoryIdExists = async (array) => {
  const categories = await Category.findAll({ attributes: ['id'] });
  const catIDS = categories.map((c) => c.id);
  const check = catIDS.every((id) => array.includes(id));
  return check;
};

// const checkUserPermission = async (postId, userId) => {
//   const findPost = await BlogPost.findByPk(postId);
//   if (!findPost) return { type: 'NOT_FOUND', message: 'Post does not exist' };

//   console.log(findPost);
//   if (findPost.userId !== userId) return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };
//   return { type: null, message: '' };
// };

module.exports = {
  createUserValidations,
  categoryIdExists,
};