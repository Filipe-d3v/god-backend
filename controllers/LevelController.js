const Level = require('../models/Level');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const getToken = require('../helpers/get-token');
const mongoose = require('mongoose');

module.exports = class LevelController {
  static async create(req, res) {
    const { proficiency, technology } = req.body;

    if (!proficiency) {
      res.status(422).json({ message: 'Informe o seu nível de proficiência.' });
      return;
    }

    if (!technology) {
      res.status(422).json({ message: 'Informe a tecnologia.' });
      return;
    }

    var user;
    const token = getToken(req);
    const decoded = jwt.verify(token, 'secret');

    user = await User.findById(decoded.id);

    /*const skillName = await Skill.findById({_id: technology});
    if(skillName !== null){
      return res.status(422).json({message: `Você ja adicionou ${skillName.name}`});
    }*/

    const level = new Level({
      proficiency: proficiency,
      technology: technology,
      owner: user
    });
    try {
      const newLevel = await level.save();
      res.status(200).json({ message: 'Skill adicionada', newLevel });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getUserSkills(req, res) {
    const id = req.params.id;
    try {


      const levels = await Level.find({ owner: id })
        .populate('technology')
        .sort('-createdAt');
      res.status(200).json({ levels });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async getMySkills(req, res) {
    try {
      const token = getToken(req);
      const decoded = jwt.verify(token, 'secret');

      const levels = await Level.find({ owner: decoded.id })
        .populate('technology')
        .sort('-createdAt');
      res.status(200).json({ levels });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async delete(req, res) {
    const levelId = req.params;

    try {
      const levelObjectId = mongoose.Types.ObjectId(levelId);
      await Level.deleteOne({ _id: levelObjectId });
      res.status(200).json({ message: 'Skill apagada!' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}