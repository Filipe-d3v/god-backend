const DocsProject = require('../models/DocsProject');
const User = require('../models/User');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class DocsProjectController {
  static async create(req, res) {
    try {
      if (!req.file) {
        return res.status(422).json({ message: 'Escolha um PDF para agregar ao projeto.' });
      };

      const { name, ofproject } = req.body;
      const doc = req.file.filename;

      if (!name) {
        return res.status(422).json({ message: 'Dê um nome ao PDF!' });
      };
      if (!ofproject) {
        return res.status(422).json({ message: 'Informe o projeto!' });
      };

      var owner
      const token = getToken(req)
      const decoded = jwt.verify(token, 'secret')

      owner = await User.findById(decoded.id)

      const newDoc = new DocsProject({
        name: name,
        doc: doc,
        ofproject: ofproject,
        owner: owner
      });

      await newDoc.save();
      return res.status(200).json({ message: 'PDF adicionado com sucesso!' });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    };
  };

  static async getDocsProject(req, res){
    const id = req.params.id;

    const docs = await DocsProject.find({ofproject: id});
    try {
      
      res.status(200).json(docs);
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
};
