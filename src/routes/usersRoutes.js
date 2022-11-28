import express from 'express';
import UserController from '../controllers/userController.js';
import { local, bearer } from '../../src/auth/middlewares.js';

const router = express.Router();

router
  .get(`${process.env.PREFIX_ROUTE}/users`, bearer, UserController.findAll)
  .get(
    `${process.env.PREFIX_ROUTE}/users/filtro`,
    bearer,
    UserController.findByName,
  )
  .post(`${process.env.PREFIX_ROUTE}/users`, bearer, UserController.create)
  .put(`${process.env.PREFIX_ROUTE}/users/:id`, bearer, UserController.update)
  .delete(
    `${process.env.PREFIX_ROUTE}/users/:id`,
    bearer,
    UserController.remove,
  );

export default router;
