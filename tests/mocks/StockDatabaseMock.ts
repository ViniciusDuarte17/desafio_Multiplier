import { IStock, IStockDTO } from "../../src/model/stock";
import { IStockRepository } from "../../src/repository/stockRepository";

export class StockDatabaseMock implements IStockRepository {
  async getStock(id: number): Promise<IStock[]> {
        const stock: IStock[] = [
            {
                id: 12,
                id_produto: 123,
                quantidade: 50,
                reserva: 1000,
                status: 1 || undefined
            },
            {
                id: 23,
                id_produto: 234,
                quantidade: 50,
                reserva: 1000,
                status: 0 || undefined
            }
        ]
        return stock
    }
  async addStock(stock: IStock): Promise<void> {
       console.log("adicionada stock");
    }
   async updateStock(id: number, stock: IStockDTO): Promise<void> {
        console.log("atualiza stock");
    }
   async deleteStock(id: number): Promise<void> {
        console.log("deleta stock");
    }

}