import { IProduct, IProductDB, IProductDTO } from "../model/product";


export interface IProductRepository {
    createProduct(product: IProduct): Promise<void>
    readProductAll(): Promise<IProductDB[]>
    getProductById(id: number): Promise<IProductDB[]>
    updateProduct(id: number, product: IProductDTO): Promise<void>
}