const ImagesProject = require('../models/ImagesProject');
const User = require('../models/User');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class ImagesProjectController {
  static async create(req, res) {
    try {
      if (!req.file) {
        return res.status(422).json({ message: 'Escolha uma imagem para a galeria do projeto.' });
      };

      const { name, ofproject } = req.body;
      const image = req.file.filename;

      if (!name) {
        return res.status(422).json({ message: 'Dê um nome à imagem!' });
      };
      if (!ofproject) {
        return res.status(422).json({ message: 'Informe o projeto!' });
      };

      var owner
      const token = getToken(req)
      const decoded = jwt.verify(token, 'secret')

      owner = await User.findById(decoded.id)

      const newImage = new ImagesProject({
        name: name,
        image: image,
        ofproject: ofproject,
        owner: owner
      });

      await newImage.save();
      return res.status(200).json({ message: 'Imagem adicionada com sucesso!' });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    };
  };

  static async getImagesProject(req, res){
    const id = req.params.id;

    const images = await ImagesProject.find({ofproject: id});
    try {
      
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
};
