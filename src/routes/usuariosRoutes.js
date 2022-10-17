import express from "express";
import UserController from "../controllers/usuariosController.js";
import { local, bearer } from "../../src/auth/middlewares.js";

const router = express.Router();
const prefixRoute = "/api/v1/users";

router
  .get(prefixRoute, bearer, UserController.findAll)
  .get(`${prefixRoute}/filtro`, bearer, UserController.findByName)
  .post(prefixRoute, bearer, UserController.create)
  .put(`${prefixRoute}/:id`, bearer, UserController.update)
  .delete(`${prefixRoute}/:id`, bearer, UserController.remove);

export default router;
