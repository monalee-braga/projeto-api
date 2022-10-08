import express from "express";
import ProdutoController from "../controllers/produtosController.js";

const router = express.Router(); 

//As rotas devem ser ordenadas da mais específica para a menos específica  
router
  .get("/produtos", ProdutoController.findAll)
  .get("/produtos/filtro", ProdutoController.findByName)
  .get("/produtos/:id", ProdutoController.findById)
  .post("/produtos", ProdutoController.create)
  .put("/produtos/:id", ProdutoController.update)
  .delete("/produtos/:id", ProdutoController.remove);

export default router;