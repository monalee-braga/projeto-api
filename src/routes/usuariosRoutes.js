import express from "express";
import UsuarioController from "../controllers/usuariosController.js";
import { local, bearer } from "../../src/auth/middlewares.js";

const router = express.Router(); 

router
  .get("/usuarios", bearer, UsuarioController.findAll)
  .get("/usuarios/filtro", bearer, UsuarioController.findByName)
  //.get("/usuarios/:id", bearer, UsuarioController.findById)
  .post("/usuarios/login", local, UsuarioController.login)
  .post("/usuarios", bearer, UsuarioController.create)
  .put("/usuarios/:id", bearer, UsuarioController.update)
  .delete("/usuarios/:id", bearer, UsuarioController.remove);

export default router;