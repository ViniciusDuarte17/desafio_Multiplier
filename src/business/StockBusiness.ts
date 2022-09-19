import { BaseError } from "../error/BaseError";
import { IStock, IStockDTO } from "../model/stock";
import { IStockRepository } from "../repository/stockRepository";


export class StockBusiness {
    constructor(private stockDatabase: IStockRepository) { };

    public async getStockAll(id: number): Promise<IStock[]> {
        const stock = await this.stockDatabase.getStock(id);
        if (stock.length <= 0) {
            throw new BaseError("stock não encontrado", 404);
        }
        return stock;
    }

    public async updateStock(id: number, stock: IStockDTO): Promise<void> {
        const { quantidade, reserva, status } = stock;

        if (!id) {
            throw new BaseError("É necessário passar o id", 422);
        }

        if (
            quantidade === undefined ||
            reserva === undefined ||
            status === undefined

        ) {
            throw new BaseError("Nenhum dos campos deve estar em branco.", 422)
        }

        if (!quantidade && !reserva && status) {
            throw new BaseError("Escolha ao menos um valor para editar!", 422)
        }

        await this.stockDatabase.updateStock(id, stock);
    }

    public async deleteStock(id: number): Promise<void> {
        if(!id) {
            throw new BaseError("É necessário passar o id", 422);
        }

        const verifyStock = await this.stockDatabase.getStock(id);

        if(verifyStock.length <= 0) {
            throw new BaseError("inválido id", 401);
        }

        await this.stockDatabase.deleteStock(id);
    }    
    
}