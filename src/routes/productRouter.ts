import express from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductController } from "../controller/ProductController";
import { ProdutsDatabase } from "../data/ProductsDatabase";
import { StocksDatabase } from "../data/StocksDatabase";


export const productRouter = express.Router();

const productDatabase = new ProdutsDatabase();
const stocksDatabase = new StocksDatabase();
const productBusiness = new ProductBusiness(productDatabase, stocksDatabase);
const productController = new ProductController(productBusiness);


productRouter.get("/", (res, req) => productController.readProductController(res, req));
productRouter.get("/:id", (res, req) => productController.getProductByidController(res, req));
productRouter.post("/", (res, req) => productController.createProductController(res,req));
productRouter.patch("/:id", (res, req) => productController.updateProductController(res,req));
