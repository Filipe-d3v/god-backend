const Assessment = require('../models/Assessment');
const Project = require('../models/Project');
const User = require('../models/User');
const Notification = require('../models/Notification');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class AssessmentController {
  static async create(req, res) {
    const { rating, project } = req.body;

    try {
      const token = getToken(req);
      const decoded = jwt.verify(token, 'secret');
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      const existingRating = await Assessment.findOne({ project, owner: currentUser._id });
      if (existingRating) {
        return res.status(400).json({ message: 'Você já avaliou este projeto.' });
      }

      const assessment = new Assessment({
        rating: rating,
        project: project,
        owner: currentUser._id
      });

      await assessment.save();
      const projectData = await Project.findById(project);
      if (!projectData) {
        return res.status(404).json({ message: 'Projeto não encontrado.' });
      }
      await Project.findByIdAndUpdate(project, { $inc: { score: rating } });
      await User.findByIdAndUpdate(projectData.owner, { $inc: { xp: rating }});

      const text = `${currentUser.username} deu uma nota de ${rating} ao projeto ${projectData.name}`;

    const notification = new Notification({
      text: text,
      about: project,
      sender: currentUser
  });

  try {
    await notification.save();
  } catch (error) {
    res.status(500).json({message: error});
  }

      res.status(200).json({ message: 'Obrigado pelo feedback!' });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
