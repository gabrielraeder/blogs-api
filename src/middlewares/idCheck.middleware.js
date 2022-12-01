const { BlogPost } = require('../models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.decoded;
  const findPost = await BlogPost.findByPk(id);
  if (!findPost) return res.status(404).json({ message: 'Post does not exist' });

  if (findPost.userId !== data.id) return res.status(401).json({ message: 'Unauthorized user' });
  next();
};

// module.exports = (req, res, next) => {
//   const { id } = req.params;
//   const { data } = req.decoded;
//   if (+id !== data.id) {
//     return res.status(401).json({ message: 'Unauthorized user' });
//   } 
//   next();
// };