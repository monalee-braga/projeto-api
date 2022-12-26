import users from '../models/User.js'
import Utilities from '../utilities.js'

class UserController {
  static findAll = (req, res) => {
    try {
      users.find((err, users) => {
        if (err) {
          res.status(500).json(err)
        }
        res.status(200).json(users)
      })
    } catch (error) {
      console.log(error)
    }
  }

  static findById = (req, res) => {
    const id = req.params.id

    users.findById(id, (err, users) => {
      if (err) {
        res.status(400).send({ message: `${err.message}` })
      } else {
        res.status(200).json(users)
      }
    })
  }

  static findByName = (req, res) => {
    const name = req.body.model.name
    users.find({ name: name }, {}, (err, users) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` })
      } else {
        res.status(200).send(users)
      }
    })
  }

  static findByEmail = async (email) => {
    try {
      const RESPONSE = await users.findOne({ email: email })
      return RESPONSE
    } catch (error) {
      return error
    }
  }

  static create = async (req, res) => {
    const password = req.body.password || ''

    if (await Utilities.validatePassword(password)) {
      req.body.password = await Utilities.generatePasswordHash(
        req.body.password
      )
      const product = new users(req.body)

      product.save((err) => {
        if (err) {
          res
            .status(500)
            .send({ message: `${err.message} - Falha ao cadastrar produto` })
        } else {
          res.status(201).send(product.toJSON())
        }
      })
    }
  }

  static update = (req, res) => {
    const id = req.params.id

    users.findByIdAndUpdate(id, { $set: req.body.model }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário atualizado com sucesso' })
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - Falha ao atualizar produto` })
      }
    })
  }

  static remove = (req, res) => {
    const { id } = req.params // Atribuição via desestruturação (destructuring assignment)
    users.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário removido com sucesso' })
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - Falha ao remover produto` })
      }
    })
  }
}

export default UserController
