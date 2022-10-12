import express from "express";
import ProdutoController from "../controllers/produtosController.js";
import { local, bearer } from "../../src/auth/middlewares.js";

const router = express.Router(); 

//As rotas devem ser ordenadas da mais específica para a menos específica  
router
  .get("/produtos", bearer, ProdutoController.findAll)
  .get("/produtos/filtro", bearer, ProdutoController.findByName)
  .get("/produtos/:id", bearer, ProdutoController.findById)
  .post("/produtos", local, ProdutoController.create)
  .put("/produtos/:id", bearer, ProdutoController.update)
  .delete("/produtos/:id", bearer, ProdutoController.remove);

export default router;