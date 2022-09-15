import { BaseError } from "../error/BaseError";
import { IProduct, IProductDB, IProductDTO } from "../model/product";
import { IProductRepository } from "../repository/productRepository";
import { BaseDatabase } from "./BaseDatabase";


export class ProdutsDatabase extends BaseDatabase implements IProductRepository {
    private static TABLE_NAME = "PRODUTOS";


    public async readProductAll(): Promise<IProductDB[]> {
        try {
            const productAll: IProductDB[] = await this.getConnection()
                .select("*")
                .from(ProdutsDatabase.TABLE_NAME);

            return productAll;
        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code);
        }
    }

    public async getProductById(id: number): Promise<IProductDB[]> {
        try {
            const productById: IProductDB[] = await this.getConnection()
                .select("*")
                .where({ id })
                .from(ProdutsDatabase.TABLE_NAME)

            return productById;
            
        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code);
        }
    }

    public async createProduct(product: IProduct): Promise<void> {
        try {
            const { id, idCategoria, codigoSKU, nome, descricao, valor, status } = product;

            await this.getConnection()
                .insert({
                    id,
                    id_categoria: idCategoria,
                    codigo: codigoSKU,
                    nome,
                    descricao,
                    valor,
                    status
                }).from(ProdutsDatabase.TABLE_NAME);

        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code);
        }
    }

    public async updateProduct(id: number, product: IProductDTO): Promise<void> {
        try {
            await this.getConnection()
            .where({id})
            .update({
                codigo: product.codigoSKU,
                nome: product.nome,
                descricao: product.descricao,
                valor: product.valor,
                status: product.status
            }).from(ProdutsDatabase.TABLE_NAME);
            
        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code);
        }
    }
}