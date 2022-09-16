import { IStock } from "../model/stock";


export interface IStockRepository {
    addStock(stock: IStock): Promise<void>
    deleteStock(id: number): Promise<void>
}