const Rating = require('../models/Rating');

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class RatingController {
  static async create(req, res) {
    const { rating} = req.body

    const id = req.params.id
    
    if(!id) {
      res.status(404).json({message: 'Projeto não encontrado!'})
      return
    }

    const project = id

    if (!rating) {
      res.status(422).json({ message: 'Avalie com as estrelimhas!' })
      return
    }
    if (!project) {
      res.status(422).json({ message: 'projeto não encontrado' })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    const localDate = new Date().toLocaleString()

    const rate = new Rating({
      date: localDate,
      rating: rating,
      project: project,
    })

    try {
      console.log(rate);
      await rate.save()
      res.status(200).json({ message: 'Obrigado pelo feedback!' })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async getAll(req, res) {
    const feedback = await Feedback.find().sort('-createdAt').populate('project')
    res.status(200).json({ feedback: feedback })
  }
}