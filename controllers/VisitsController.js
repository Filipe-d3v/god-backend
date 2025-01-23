const Visits = require('../models/Visits');
const User = require('../models/User');
const Notification = require('../models/Notification');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class VisitsController {
  static async create(req, res) {

    const token = getToken(req);
    const decoded = jwt.verify(token, 'secret');
    const currentUser = await User.findById(decoded.id);

    const {visited} = req.body;

    if(currentUser._id.toString() === visited) {
      return;
    }

    const visit = new Visits({
      visitor: currentUser._id,
      visited: visited
    });

    const notification = new Notification({
      text: `${currentUser.name} visitou seu perfil!`,
      sender: currentUser._id,
      receiver: visited
    });

    try {
      await visit.save();
      await notification.save();
      res.status(201).json({ message: 'Visita registrada com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao registrar visita.', error });
    }
  }
};