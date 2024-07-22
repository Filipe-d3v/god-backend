const Notification = require('../models/Notification');
const User = require('../models/User');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class NotificationController {
  static async create(req, res){
    const {text, about} = req.body;

    var user;
    const token = getToken(req);
    const decoded = jwt.verify(token, 'secret');
    user = await User.findById(decoded.id);

    const notification = new Notification({
      text: text,
      about: about,
      sender: user
  });

  try {
    const newNot = await notification.save();
    res.status(200).json({message: 'Notificação gerada', newNot});
  } catch (error) {
    res.status(500).json({message: error});
  }
}
}