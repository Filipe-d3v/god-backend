const Post = require('../models/Post');
const User = require('../models/User');

const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class PostController {
  static async create(req, res) {
    const { subtitle, project } = req.body

    if (!subtitle) {
      res.status(400).json({ message: 'A legenda é obrigatória' });
      return
    }

    if (!project) {
      res.status(400).json({ message: 'Projeto não selecionado' });
      return
    }

    var user
    const token = getToken(req)
    const decoded = jwt.verify(token, 'secret')

    user = await User.findById(decoded.id)

    const post = new Post({
      subtitle: subtitle,
      date: new Date().toLocaleString(),
      project: project,
      owner: user,
    })
    try {
      await post.save();
      res.status(200).json({ message: 'Postado!' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    try {
      const posts = await Post.find()
        .populate({
          path: 'project',
          select: ['name', 'image', 'link'],
          populate: {
            path: 'projectSkills',
            model: 'Skill'
          }
        })
        .populate({
          path: 'owner',
          select: ['name', 'email', 'image', 'surname', 'username']
        })
        .sort('-createdAt');
  
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}