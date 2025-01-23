const Notification = require('../models/Notification');
const User = require('../models/User');
const Project = require('../models/Project');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class NotificationController {

  static async create(req, res) {
    const [sender, about] = req.body;
  }

  static async getAll(req, res) {
    try {
      const token = getToken(req);
      const decoded = jwt.verify(token, 'secret');
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      const notifications = await Notification.find()
        .populate({
          path: 'about',
          match: { owner: currentUser._id },
          populate: { path: 'owner', model: 'User', select: 'username name xp image' }
        })
        .populate('sender', 'username name xp image verified');
      const filteredNotifications = notifications.filter((note) => note.about !== null);

      res.status(200).json(filteredNotifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
