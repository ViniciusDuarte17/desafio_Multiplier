import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { IProductDTO } from "../model/product";


export class ProductController {
    constructor(private productBusiness: ProductBusiness) { };

    public async readProductController(req: Request, res: Response): Promise<void> {
        try {
            const productAll = await this.productBusiness.getProduct();
            
            res.status(200).send(productAll);
        } catch (error: any) {
            res.send({ error: error.message }).status(error.code);
        }
    }

    public async getProductByidController(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const productById = await this.productBusiness.getProductById(id);

            res.status(200).send(productById);
            
        } catch (error: any) {
            res.send({ error: error.message }).status(error.code);
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

        } catch (error: any) {
            res.send({ error: error.message }).status(error.code);
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

            res.status(200).send({message: "produto editado com sucesso!"})
            
        } catch (error: any) {
            res.send({ error: error.message }).status(error.code);
        }
    }
}
