import users from '../models/User.js'
import token from '../models/Token.js'
import Utilities from '../utilities.js'

class AuthController {
  static async findByEmail (email) {
    try {
      return await users.findOne({ email: email })
    } catch (error) {
      return error
    }
  }

  static async findOne (id) {
    try {
      await users.findById(id, (err, user) => {
        if (err) {
          return err
        } else {
          return user
        }
      })
    } catch (error) {
      return error
    }
  }

  static register = async (req, res) => {
    const password = req.body.password

    if (await Utilities.validatePassword(password)) {
      req.body.password = await Utilities.generatePasswordHash(
        req.body.password
      )
      const userModel = new users(req.body)

      userModel.save((err) => {
        if (err) {
          res
            .status(500)
            .send({ message: `${err.message} - Falha ao cadastrar usuário` })
        } else {
          res.status(201).send(userModel.toJSON())
        }
      })
    }
  }

  static login = (req, res) => {
    try {
      const user = req.user
      const accessToken = Utilities.createTokenJWT(user)
      const refreshToken = Utilities.createTokenRefresh(user)

      const createdAt = Utilities.generateDate('', 0, 0)
      const expiredAt = Utilities.generateDate(createdAt, 1, 15)

      const model = {
        userId: user._id,
        createdAt,
        token: accessToken,
        expiredAt
      }

      const Newtoken = new token(model)

      Newtoken.save((err) => {
        if (err) {
          res
            .status(500)
            .send({ message: `${err.message} - Falha ao salvar token` })
        } else {
          res.set('Authorization', accessToken)
          res.status(200).send({ refreshToken })
        }
      })
    } catch (error) {
      res.status(500).send({ message: `${error}` })
    }
  }

  static logout = async (req, res) => {
    const bearerToken = req.headers.authorization || ''
    if (bearerToken) {
      const accessToken = bearerToken.split(' ')[1]
      const tokenObject = await token.findOne({ token: accessToken })
      token.findByIdAndDelete(tokenObject._id, (err) => {
        if (!err) {
          res.status(200).send({ message: 'Logout realizado com sucesso' })
        } else {
          res.status(500).send({ message: `${err}` })
        }
      })
    }
  }

  static async findToken (accessToken) {
    const tokenObject = await token.findOne({ token: accessToken })
    if (tokenObject) return true
    else return false
  }

  static refresh = (req, res) => {}
}

export default AuthController
