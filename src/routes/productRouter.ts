import express from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { StockBusiness } from "../business/StockBusiness";
import { ProductController } from "../controller/ProductController";
import { StockController } from "../controller/StockController";
import { ProdutsDatabase } from "../data/ProductsDatabase";
import { StocksDatabase } from "../data/StocksDatabase";


export const productRouter = express.Router();

const productDatabase = new ProdutsDatabase();
const stocksDatabase = new StocksDatabase();
const productBusiness = new ProductBusiness(productDatabase, stocksDatabase);
const productController = new ProductController(productBusiness);

const stockBunisess = new StockBusiness(stocksDatabase);
const stockController = new StockController(stockBunisess);


productRouter.get("/", (res, req) => productController.readProductController(res, req));
productRouter.get("/:id", (res, req) => productController.getProductByidController(res, req));
productRouter.post("/", (res, req) => productController.createProductController(res, req));
productRouter.patch("/:id", (res, req) => productController.updateProductController(res, req));
productRouter.delete("/:id", (res, req) => productController.deleteProductController(res, req));



// ROTAS DE ESTOQUE
productRouter.get("/categoria/:id", (res, req) => stockController.getStockAll(res, req));
productRouter.patch("/categoria/:id", (res, req) => stockController.updateStock(res, req));
productRouter.delete("/categoria/:id", (res, req) => stockController.deleteStock(res, req));
