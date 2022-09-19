import { IProduct, IProductDB, IProductDTO } from "../../src/model/product";
import { IProductRepository } from "../../src/repository/productRepository";


export class ProductDatabaseMock implements IProductRepository {
    async createProduct(product: IProduct): Promise<void> {
        console.log("produto criado");
    }
    async readProductAll(): Promise<IProductDB[]> {
        const product: IProductDB[] = [
            {
                id: 123,
                id_categoria: 456,
                nome: "nome",
                codigo: "codigo",
                descricao: "descricao",
                valor: 789,
                status: 0
            },
            {
                id: 423,
                id_categoria: 656,
                nome: "nome2",
                codigo: "codigo2",
                descricao: "descricao2",
                valor: 589,
                status: 1
            }
        ]
        return product
    }
    async getProductById(id: number): Promise<IProductDB[]> {
        const product: IProductDB[] = [
            {
                id: 123,
                id_categoria: 456,
                nome: "nome",
                codigo: "codigo",
                descricao: "descricao",
                valor: 789,
                status: 0
            }  
     ]

     const productNotExiste: IProductDB[] = []

        if(id === product[0].id){
            return product
        } else {
            return productNotExiste
        }
    }
   async updateProduct(id: number, product: IProductDTO): Promise<void> {
        
    }
   async updateProductById(id: number): Promise<void> {
       
    }
   async deleteProduct(id: number): Promise<void> {
        
    }

}