const Question = require('../models/Question');
const jwt = require('jsonwebtoken');
const getToken = require('../helpers/get-token');
const User = require('../models/User');


module.exports = class QuestionController{
  static async create(req, res){
    const {text, response, code} = req.body;

    if(!text){
      res.status(422).json({message: 'Digite a pergunta.'})
      return
    }
    
    if(!code){
      res.status(422).json({message: 'Coloque o trecho de código.'})
      return
    }
    var owner;
    const token = getToken(req);
    const decoded = jwt.verify(token, 'secret')

    owner = await User.findById(decoded.id)

    const question = new Question({
      text: text,
      code: code,
      owner: owner,
      response: response,
    });

    try {
      const newQuestion = await question.save();
      res.status(200).json({message: 'Pergunta postada!', newQuestion})
    } catch (error) {
      res.status(500).json({error});
    }

  }

  static async getAll(req, res){
    const questions = await Question.find().sort('-CreatedAt');
    res.status(200).json({questions})
  }

  static async getById(req, res){
    const id = req.params
    const question = await Question.findById(id)

    if(!question) {
      res.status(404).json({message: 'Pergunta não encontrado'})
      return
    }

    res.status(200).json({question})
  }
}
