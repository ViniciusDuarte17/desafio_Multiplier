import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { BaseError } from "../error/BaseError";
import { IProductDTO } from "../model/product";


export class ProductController {
    constructor(private productBusiness: ProductBusiness) { };

    public async readProductController(req: Request, res: Response): Promise<void> {
        try {
            const productAll = await this.productBusiness.getProduct();

            res.status(200).send(productAll);

        } catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }

    public async getProductByidController(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const productById = await this.productBusiness.getProductById(id);

            res.status(200).send(productById);

        } catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }

    public async createProductController(req: Request, res: Response): Promise<void> {
        try {
            const { idCategoria, codigoSKU, nome, descricao, valor, status } = req.body;

            const inputProduct: IProductDTO = {
                idCategoria,
                codigoSKU,
                nome,
                descricao,
                valor,
                status
            }

            await this.productBusiness.createProduct(inputProduct);

            res.status(201).send({ message: "Produto criado com sucesso!" });

        } catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }

    public async updateProductController(req: Request, res: Response): Promise<void> {
        try {
            const { codigoSKU, nome, descricao, valor, status } = req.body;
            const id = Number(req.params.id);
            const inputProduct: IProductDTO = {
                codigoSKU,
                nome,
                descricao,
                valor,
                status
            }

            await this.productBusiness.updateProduct(id, inputProduct)

            res.status(200).send({ message: "produto editado com sucesso!" })

        } catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }

    public async deleteProductController(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);

            await this.productBusiness.deleteProduct(id);

            res.status(200).send({message: "Produto deletado com sucesso!"});
            
        }  catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }
}
