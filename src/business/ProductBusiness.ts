import { BaseError } from "../error/BaseError";
import { IProduct, IProductDB, IProductDTO } from "../model/product";
import { IProductRepository } from "../repository/productRepository";
import { IStock } from "../model/stock";
import { IStockRepository } from "../repository/stockRepository";

export class ProductBusiness {
    constructor(
        private productDatabase: IProductRepository,
        private stockDatabase: IStockRepository
    ) { };

    public async getProduct(): Promise<IProductDB[]> {

        const product: IProductDB[] = await this.productDatabase.readProductAll();

        if (product.length <= 0) {
            throw new BaseError("Produtos não encontrados!", 404);
        }

        return product;
    }

    public async getProductById(id: number): Promise<IProductDB> {

        const productById: IProductDB[] = await this.productDatabase.getProductById(id);

        if (productById.length <= 0) {
            throw new BaseError("Produto não encontrado", 404);
        }

        return productById[0];

    }

    public async createProduct(product: IProductDTO): Promise<void> {

        const { idCategoria, codigoSKU, nome, descricao, valor, status } = product;

        if (!idCategoria || !codigoSKU || !nome || !descricao || !valor) {
            throw new BaseError("É necessário preencher todos os compos!", 400);
        }

        const id = Math.random() * 10 * (28 + 14);

        const idS = Math.random() * 10 * (35 + 14);
        // GERERANDO UM ID DIREFERENTE 

        const productInput: IProduct = {
            id,
            idCategoria,
            codigoSKU,
            nome,
            descricao,
            valor,
            status
        }

        const generationStock: IStock = {
            id: idS,
            id_produto: id,
            quantidade: 0,
            reserva: 0,
            status: 0
        }

        await this.productDatabase.createProduct(productInput);
        // PRIMEIRO CRIA O PRODUTO

        await this.stockDatabase.addStock(generationStock);
        // SEGUNDO CRIA O STOCK COM VALOR 0

    }

    public async updateProduct(id: number, product: IProductDTO): Promise<void> {

        const { codigoSKU, nome, descricao, valor, status } = product;

        if (!id) {
            throw new BaseError("É necessário informar o id no parms da requição", 422)
        }

        const getProudct = await this.productDatabase.getProductById(id);

        if (getProudct.length <= 0) {
            throw new BaseError("produto não encontrado!", 401);
        }

        if (
            codigoSKU === '' ||
            nome === '' ||
            descricao === '' ||
            status === undefined ||
            valor === undefined
        ) {
            throw new BaseError("Nenhum dos campos deve estar em branco.", 422)
        }

        if (!codigoSKU && !nome && descricao && !valor) {
            throw new BaseError("Escolha ao menos um valor para editar!", 422)
        }

        await this.productDatabase.updateProduct(id, product);
    }

    public async deleteProduct(id: number): Promise<void> {

        if (!id) {
            throw new BaseError("É necessário informar o id no parms da requição", 422);
        }

        const getStockProduct = await this.stockDatabase.getStockByIdProduct(id)

        if (getStockProduct.length <= 0) {
            throw new BaseError("Sem permisão, verifique se está passando o id corretamente.", 401);
        }

        await this.stockDatabase.deleteStock(getStockProduct[0].id);

        await this.productDatabase.deleteProduct(id);
    }
}