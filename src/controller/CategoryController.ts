import { Request, Response } from "express";
import { CategoryBusiness } from "../business/CategoryBusiness";
import { BaseError } from "../error/BaseError";
import { ICategoryDTO } from "../model/category";


export class CategoryController {
    constructor(private categoryBusiness: CategoryBusiness) { }


    public async getCategoryAll(req: Request, res: Response): Promise<void> {
        try {

            const result = await this.categoryBusiness.categoryAll()
            res.status(200).send(result);

        } catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }

    public async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const result = await this.categoryBusiness.categoryById(id);
            res.status(200).send(result);

        } catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }

    public async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const { condigoSlug, titulo, status } = req.body;

            const input: ICategoryDTO = {
                codigo: condigoSlug,
                titulo,
                status
            }

            await this.categoryBusiness.insertCategory(input);

            res.status(201).send({ message: "categoria adicionada com sucesso!" });

        } catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }

    public async editCatagory(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const { condigoSlug, titulo, status } = req.body;

            const inputCategory: ICategoryDTO = {
                codigo: condigoSlug,
                titulo,
                status
            }

            await this.categoryBusiness.editCategory(id, inputCategory);

            res.status(200).send({ message: "Categoria editada com sucesso!" });

        } catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }

    public async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);

            await this.categoryBusiness.deleteCategory(id);

            res.status(200).send({ message: "Categoria deletada com sucesso!" });

        } catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)

            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }
}