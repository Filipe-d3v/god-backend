const Rating = require('../models/Rating');

const getToken = require('../helpers/get-token');
const User = require('../models/User');

module.exports = class RatingController {
  static async create(req, res) {
    const rating = req.body
    console.log("foi")

    const id = req.params.id
    
    if(!id) {
      res.status(404).json({message: 'Projeto não encontrado!'})
      return
    }

    if (!rating) {
      res.status(422).json({ message: 'Avalie com as estrelimhas!' })
      return
    }

    let user;
    const token = getToken(req);
    const decoded = jwt.verify(token, 'secret');

    user = await User.findById(decoded.id);

    const rate = new Rating({
      rating: rating,
      project: id,
      owner: user
    })
    try {
      
      await rate.save()
      res.status(200).json({ message: 'Obrigado pelo feedback!' })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}