const Phone = require('../models/Phone');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const getToken = require('../helpers/get-token');

module.exports = class PhoneController {
  static async create(req, res) {
    const { country, ddd, number } = req.body;

    if (!country) {
      res.status(422).json({ message: 'Selecione o país.' });
      return
    }
    if (!ddd) {
      res.status(422).json({ message: 'Informe o código de área' });
      return
    }
    if (!number) {
      res.status(422).json({ message: 'Digite o número.' });
      return
    }

    var user;
    const token = getToken(req);
    const decoded = jwt.verify(token, 'secret');
    user = await User.findById(decoded.id);

    const phone = new Phone({
      country: country,
      ddd: ddd,
      number: number,
      owner: user
    });

    try {
      const newPhone = await phone.save().populate('owner');
      res.status(200).json({message: 'Telefone cadastrado', newPhone})
    } catch (error) {
      res.status(500).json({message: error});
    }
  }
}