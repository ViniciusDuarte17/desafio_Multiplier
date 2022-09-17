import { IStock, IStockDTO } from "../model/stock";


export interface IStockRepository {
    getStock(id: number): Promise<IStock[]>
    addStock(stock: IStock): Promise<void>
    updateStock(id: number, stock: IStockDTO): Promise<void>
    deleteStock(id: number): Promise<void>
}