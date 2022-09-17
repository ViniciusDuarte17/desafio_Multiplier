import express from "express";
import { CategoryBusiness } from "../business/CategoryBusiness";
import { CategoryController } from "../controller/CategoryController";
import { CategoryDatabase } from "../data/CategoryDatabase";


export const categoryRouter = express.Router();

const categoryDatabase = new CategoryDatabase();
const categoryBusiness = new CategoryBusiness(categoryDatabase);
const categoryController = new CategoryController(categoryBusiness);

categoryRouter.get("/", (res, req) => categoryController.getCategoryAll(res, req));
categoryRouter.get("/:id", (res, req) => categoryController.getCategoryById(res, req));
categoryRouter.post("/cadastro", (res, req) => categoryController.createCategory(res, req));
categoryRouter.patch("/editar/:id", (res, req) => categoryController.editCatagory(res, req));
categoryRouter.delete("/:id", (res, req) => categoryController.deleteCategory(res, req));