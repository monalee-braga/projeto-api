import express from "express";
import ProductController from "../controllers/produtosController.js";
import { local, bearer } from "../../src/auth/middlewares.js";

const router = express.Router();

//As rotas devem ser ordenadas da mais específica para a menos específica
router
  .get("/api/product", bearer, ProductController.findAll)
  .get("/api/product/filtro", bearer, ProductController.findByName)
  .get("/api/product/:id", bearer, ProductController.findById)
  .post("/api/product", local, ProductController.create)
  .put("/api/product/:id", bearer, ProductController.update)
  .delete("/api/product/:id", bearer, ProductController.remove);

export default router;
