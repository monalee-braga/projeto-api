import express from 'express'
import users from './usersRoutes.js'
import auth from './authRoutes.js'
import authentication from '../middlewares/authStrategy.js'

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send('Curso de Node')
  })

  app.use(express.json(), auth, users)
}

export default routes
