const Notification = require('../models/Notification');
const User = require('../models/User');
const Project = require('../models/Project');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class NotificationController {
  static async getAll(req, res) {
    try {
      // Obtém o token e decodifica para pegar o ID do usuário
      const token = getToken(req);
      const decoded = jwt.verify(token, 'secret');
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      // Busca as notificações onde o dono do projeto (owner) seja o usuário atual
      const notifications = await Notification.find()
        .populate({
          path: 'about', // Popula o campo 'about', que é o projeto
          match: { owner: currentUser._id }, // Garante que o owner do projeto seja o usuário atual
          populate: { path: 'owner', model: 'User', select: 'username name xp image' } // Popula o dono do projeto
        })
        .populate('sender', 'username name xp image verified'); // Popula o sender da notificação

      // Filtra notificações que possuem um projeto correspondente (onde o owner é o currentUser)
      const filteredNotifications = notifications.filter((note) => note.about !== null);

      res.status(200).json(filteredNotifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
