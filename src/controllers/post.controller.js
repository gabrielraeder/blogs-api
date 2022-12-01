const postService = require('../services/post.service');

const addPost = async (req, res) => {
  const post = req.body;
  const token = req.header('Authorization');
  const { type, message } = await postService.addPost(post, token);
  if (type) return res.status(400).json({ message });
  return res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const allPosts = await postService.getAll();
  return res.status(200).json(allPosts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getById(+id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { type, message } = await postService.update(data, +id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { data } = req.decoded;
  await postService.remove(+id, data.id);
  // const { type, message } = await postService.remove(+id, data.id);
  // if (type === 'UNAUTHORIZED') return res.status(401).json({ message });
  // if (type === 'NOT_FOUND') return res.status(404).json({ message });
  return res.status(204).json();
};

const getByQuery = async (req, res) => {
  const { q } = req.query;
  const result = await postService.getByQuery(q);
  return res.status(200).json(result);
};

module.exports = {
  addPost,
  getAll,
  getById,
  update,
  remove,
  getByQuery,
};