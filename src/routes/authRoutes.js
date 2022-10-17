import express from "express";
import AuthController from "../controllers/authController.js";
import { local, bearer } from "../../src/auth/middlewares.js";

const router = express.Router();
const prefixRoute = "/api/v1/auth";

router
  .post(`${prefixRoute}/register`, AuthController.register)
  .post(`${prefixRoute}/login`, local, AuthController.login)
  .get(`${prefixRoute}/logout`, bearer, AuthController.logout);
//.get(`${prefixRoute}refresh`, bearer, AuthController.refresh)

export default router;
