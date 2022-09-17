import { BaseError, ErrorMySql } from "../error/BaseError";
import { IStock, IStockDTO } from "../model/stock";
import { IStockRepository } from "../repository/stockRepository";
import { BaseDatabase } from "./BaseDatabase";



export class StocksDatabase extends BaseDatabase implements IStockRepository {
    private static TABLE_NAME = "ESTOQUE";

    public async addStock(stock: IStock): Promise<void> {
        try {
            const { id, id_produto, quantidade, reserva, status } = stock;

            await this.getConnection()
                .insert({
                    id,
                    id_produto,
                    quantidade,
                    reserva,
                    status
                }).from(StocksDatabase.TABLE_NAME);

        } catch (error) {
            if (error instanceof ErrorMySql)
                throw new ErrorMySql(error.sqlMessage, error.code)
        }
    }

    public async getStock(id: number): Promise<IStock[]> {

        const stock: IStock[] = await this.getConnection()
            .select("*")
            .from("ESTOQUE")
            .innerJoin("PRODUTOS", "ESTOQUE.id_produto", "PRODUTOS.id")
            .where("id_produto", "=", id);

        return stock;
    }

    public async updateStock(id: number, stock: IStockDTO): Promise<void> {
        try {

            await this.getConnection()
                .from(StocksDatabase.TABLE_NAME)
                .where("id_produto", "=", id)
                .update({
                    quantidade: stock.quantidade,
                    reserva: stock.reserva,
                    status: stock.status
                });

        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code)
        }
    }

    public async deleteStock(id: number): Promise<void> {
        try {

            await this.getConnection()
                .delete()
                .where({ id })
                .from(StocksDatabase.TABLE_NAME);

        } catch (error) {
            if (error instanceof ErrorMySql)
                throw new ErrorMySql(error.sqlMessage, error.code)
        }
    }
}