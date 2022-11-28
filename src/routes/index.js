import express from 'express';
import products from './productsRoutes.js';
import users from './usersRoutes.js';
import auth from './authRoutes.js';
import authentication from '../auth/authentication.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send('Curso de Node');
  });

  app.use(express.json(), auth, users, products);
};

export default routes;
