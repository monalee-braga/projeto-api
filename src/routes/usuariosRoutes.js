import express from "express";
import UsuarioController from "../controllers/usuariosController.js";

const router = express.Router(); 

router
  .get("/usuarios", UsuarioController.findAll)
  .get("/usuarios/filtro", UsuarioController.findByName)
  .get("/usuarios/:id", UsuarioController.findById)
  .post("/usuarios", UsuarioController.create)
  .put("/usuarios/:id", UsuarioController.update)
  .delete("/usuarios/:id", UsuarioController.remove);

export default router;