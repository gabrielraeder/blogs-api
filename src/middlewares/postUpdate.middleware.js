module.exports = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { id } = req.params;
  const { data } = req.decoded;
  if (+id !== data.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  } 
  next();
};