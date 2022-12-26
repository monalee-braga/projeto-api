import express from 'express';
import AuthController from '../controllers/authController.js';
import { local, bearer } from '../../src/auth/middlewares.js';

const router = express.Router();

router
  .post(`${process.env.PREFIX_ROUTE}/auth/register`, AuthController.register)
  .post(`${process.env.PREFIX_ROUTE}/auth/login`, local, AuthController.login)
  .get(`${process.env.PREFIX_ROUTE}/auth/logout`, bearer, AuthController.logout,);
//.get(`${prefixRoute}refresh`, bearer, AuthController.refresh)

export default router;
