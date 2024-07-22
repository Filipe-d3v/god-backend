const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const getToken = require('../helpers/get-token');
const mongoose = require('mongoose');
module.exports = class ProjectController {
  static async create(req, res) {
    const { name, link, projectSkills, desc, value } = req.body;
  
    if (!req.file) {
      res.status(422).json({ message: 'Escolha uma foto para o projeto!' });
      return;
    }
  
    if (!desc) {
      res.status(422).json({ message: 'Por favor, insira uma descrição para o projeto' });
      return;
    }
  
    const image = req.file.filename;
  
    if (!name) {
      res.status(422).json({ message: 'Dê ao projeto um nome!' });
      return;
    }
  
    if (!projectSkills) {
      res.status(422).json({ message: 'Informe pelo menos uma habilidade usada no projeto.' });
      return;
    }
  
  
    var currentUser;
    const token = getToken(req);
    const decoded = jwt.verify(token, 'secret');
  
    currentUser = await User.findById(decoded.id);
  
    const parsedProjectSkills = JSON.parse(projectSkills);
  
    const project = new Project({
      name: name,
      link: link,
      image: image,
      desc: desc,
      value: value,
      projectSkills: parsedProjectSkills,
      owner: {
        _id: currentUser._id,
        name: currentUser.name,
        username: currentUser.username,
        xp: currentUser.xp,
        surname: currentUser.surname,
        email: currentUser.email,
        image: currentUser.image,
        phone: currentUser.phone,
      },
    });
  
    try {
      
      const newProject = await project.save();
      res.status(200).json({ message: 'Projeto postado!', newProject});
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error);
    }
  }


  static async update(req, res) {
    const id = req.params.id;
    const { name, desc, link, projectSkills, value } = req.body;
    const updatedData = {};
    let image;
    const images = req.files;

    if (req.file) {
      image = req.file.filename;
    }

    const project = await Project.findOne({ _id: id })

    if (!project) {
      res.status(404).json({ message: 'Projeto não encontrado!' })
      return
    }

    const parsedProjectSkills = JSON.parse(projectSkills);

    updatedData.name = name;
    updatedData.desc = desc;
    updatedData.image = image;
    updatedData.link = link;
    updatedData.value = value;
    updatedData.projectSkills = parsedProjectSkills;
    if (images.length > 0) {
      updatedData.images = []
      images.map((images) => {
        updatedData.images.push(images.filename)
      })
    }

    await Project.findByIdAndUpdate(id, updatedData)
    res.status(200).json({ message: 'Projeto atualizado!' })
  }

  static async getAll(req, res) {

    const projects = await Project.find().populate('projectSkills').sort('-createdAt')
    res.status(200).json({ projects: projects, })
  }

  static async getAllUserProjects(req, res) {

    var user
    const token = getToken(req)
    const decoded = jwt.verify(token, 'secret')

    user = await User.findById(decoded.id)

    const projects = await Project.find({ 'owner._id': user._id }).populate('projectSkills').sort('-createdAt')

    res.status(200).json({ projects })
  }

  static async getProjectById(req, res) {
    const id = req.params.id

    const project = await Project.findById(id).populate('projectSkills')

    if (!project) {
      res.status(400).json({ message: 'Projeto não encontrado!' })
      return
    }

    res.status(200).json({ project })
  }

  static async delete(req, res) {
    const projectId = req.params;

    try {
      const projectObjectId = mongoose.Types.ObjectId(projectId);
      await Post.deleteMany({ project: projectObjectId });
      await Project.deleteOne({ _id: projectObjectId });
      res.status(200).json({ message: 'Projeto e posts associados foram deletados!' })
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async addImages(req, res) {
    const id = req.params.id;
    const images = req.files;

    try {
      if (images && images.length > 0) {
        const updatedData = {
          images: images.map(image => image.filename)
        };

        const project = await Project.findByIdAndUpdate(id, updatedData, { new: true });

        if (!project) {
          return res.status(404).json({ message: 'Projeto não encontrado' });
        }

        return res.status(200).json({ message: 'Imagens adicionadas!', project: project });
      } else {
        return res.status(400).json({ message: 'Nenhuma imagem foi enviada' });
      }
    } catch (err) {
      console.error('Erro ao adicionar imagens:', err);
      return res.status(500).json({ message: 'Erro interno ao adicionar imagens', error: err });
    }
  }

} 