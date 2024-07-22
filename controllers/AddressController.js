const Addres = require('../models/Address');
const User = require('../models/User');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class AddresController {
  static async create(req, res) {
    const {country, city, uf, state, postalcode, street, number} = req.body;

    if(!country){
      res.status(422).json({message: 'Selecione o país.'});
      return
    }
    if(!city){
      res.status(422).json({message: 'Insira o CEP.'});
      return
    }
    if(!uf){
      res.status(422).json({message: 'Insira o CEP..'});
      return
    }
    if(!state){
      res.status(422).json({message: 'Insira o CEP.'});
      return
    }
    if(!postalcode){
      res.status(422).json({message: 'Insira o CEP.'});
      return
    }
    if(!street){
      res.status(422).json({message: 'Digite o nome da rua'});
      return
    }
    if(!number){
      res.status(422).json({message: 'Digite o número.'});
      return
    }

    let user;
    const token = getToken(req);
    const decoded = jwt.verify(token, 'secret');
    user = await User.findById(decoded.id);


    const address = new Addres({
      country: country,
      city: city,
      postalcode: postalcode,
      uf: uf,
      state: state,
      street: street,
      number: number,
      owner: user
    });

    try {
      const newAddress = await address.save();
      res.status(200).json({message: 'Endereço Cadastrado', newAddress});
    } catch (error) {
      res.status(500).json({message: error})
    }

  }
}