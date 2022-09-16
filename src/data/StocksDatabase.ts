import { BaseError, ErrorMySql } from "../error/BaseError";
import { IStock } from "../model/stock";
import { IStockRepository } from "../repository/stockRepository";
import { BaseDatabase } from "./BaseDatabase";



export class StocksDatabase extends BaseDatabase implements IStockRepository {
    private static TABLE_NAME = "ESTOQUE";

    public async addStock(stock: IStock): Promise<void> {
        try {
            const {id, id_produto, quantidade, reserva, status} = stock;

            await this.getConnection()
            .insert({
                id,
                id_produto,
                quantidade,
                reserva,
                status
            }).from(StocksDatabase.TABLE_NAME);
            
        } catch (error) {
            if(error instanceof ErrorMySql)
            throw new ErrorMySql(error.sqlMessage, error.code)
        }
    }
}