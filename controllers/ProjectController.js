const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const getToken = require('../helpers/get-token');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
module.exports = class ProjectController {
  static async create(req, res) {
    const { name, link, projectSkills, desc, value, platform } = req.body;


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
      res.status(422).json({ message: 'Informe pelo menos uma tecnologia usada no projeto.' });
      return;
    }
    if (!platform) {
      res.status(422).json({ message: 'Seleciona a plataforma do projeto.' })
      return;
    }


    let currentUser;
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
      platform: platform,
      projectSkills: parsedProjectSkills,
      owner: currentUser,

    });
    try {

      const newProject = await project.save();
      res.status(200).json({ message: 'Projeto postado!', newProject });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }


  static async update(req, res) {
    const id = req.params.id;
    const { name, desc, link, projectSkills, value } = req.body;
    const updatedData = {};
    let image;

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

    await Project.findByIdAndUpdate(id, updatedData)
    res.status(200).json({ message: 'Projeto atualizado!' })
  }

  static async getAll(req, res) {

    const projects = await Project.find().populate('projectSkills').sort('-createdAt')
    res.status(200).json({ projects: projects, })
  }

  static async getTop10(req, res) {
    try {
      const topProjects = await Project.find().sort({ score: -1 }).limit(10);
      res.status(200).json(topProjects);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }

  static async getAllUserProjects(req, res) {
    try {
      const token = getToken(req);
      const decoded = jwt.verify(token, 'secret');

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const projects = await Project.find({ owner: user._id })
        .populate('projectSkills')
        .populate({
          path: 'owner',
          select: 'name image value'
        })
        .sort('-createdAt');

      res.status(200).json({ projects });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  static async getProjectById(req, res) {
    try {
      const id = req.params.id;

      // Verifica se o ID fornecido é válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de projeto inválido!' });
      }

      const project = await Project.findById(id)
        .populate('projectSkills')
        .populate({
          path: 'owner',
          select: 'name surname xp username email image'
        });

      if (!project) {
        return res.status(404).json({ message: 'Projeto não encontrado!' });
      }

      res.status(200).json({ project });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  static async delete(req, res) {
    const projectId = req.params.id; // Ajuste para acessar o id corretamente
  
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Projeto não encontrado' });
      }
  
      // Apagar a imagem principal
      const mainImagePath = path.join(__dirname, '../public/img/projects/', project.image);
      if (fs.existsSync(mainImagePath)) {
        fs.unlinkSync(mainImagePath);
      }
  

      if (project.images && Array.isArray(project.images)) {
        const flatImages = project.images.flat(); // Achata o array, se necessário
        flatImages.forEach((image) => {
          const imagePath = path.join(__dirname, '../public/img/projects/', image);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        });
      }
  
      const projectObjectId = mongoose.Types.ObjectId(projectId);
      await Post.deleteMany({ project: projectObjectId });
      await Project.deleteOne({ _id: projectObjectId });
      res.status(200).json({ message: 'Projeto e posts associados foram deletados!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
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