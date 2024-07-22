const Response = require('../models/Response');
const User = require('../models/User');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class ResponseController{
  static async create(req, res){
    const {text, code, question} = req.body;

    if(!text) {
      res.status(422).json({message: 'Legenda obrigatória.'});
      return
    }

    let owner
    const token = getToken(req);
    const decoded = jwt.verify(token, 'secret')

    owner = await User.findById(decoded.id)


    const response = new Response({
      text: text,
      code: code,
      owner: owner,
      question: question,
    });
    try {
      const newResponse = await response.save();
      res.status(200).json({message: 'REsposta criada com sucesso!', newResponse});
    } catch (error) {
      res.status(500).json({error})
    }
  }

  static async getAll(req, res) {
    const responses = await Response.find().populate('question');

    res.status(200).json({responses});
  }
}

