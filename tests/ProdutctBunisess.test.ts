import { ProductBusiness } from "../src/business/ProductBusiness";
import { IProductDTO } from "../src/model/product";
import { ProductDatabaseMock } from "./mocks/ProductDatabaseMock";
import { StockDatabaseMock } from "./mocks/StockDatabaseMock";


const productDatabaseMock = new ProductDatabaseMock(); 
const stockDatabaseMock = new StockDatabaseMock();

const productBusiness = new ProductBusiness(productDatabaseMock, stockDatabaseMock);


describe( "TESTANDO A CAMADA ProductBusiness", () => {
    test("Caso de sucesso no método getProduct", async() => {
        try {
            expect.assertions(1)
            const product = [
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
         const result = await productBusiness.getProduct()
         expect(result).toEqual(product);
            
        } catch (error) {}
        
    });

    test("Caso de sucesso no método getProductById", async() => {
        try {
            expect.assertions(1)
            const id = 123;
            const product = 
                {
                    id: 123,
                    id_categoria: 456,
                    nome: "nome",
                    codigo: "codigo",
                    descricao: "descricao",
                    valor: 789,
                    status: 0
                }
            
         const result = await productBusiness.getProductById(id)
         expect(result).toEqual(product);
            
        } catch (error) {}
        
    });
    
    test("Caso de error no métado getProductById", async() => {
        expect.assertions(2);
        try {
            const id = 1234
            await productBusiness.getProductById(id)
        } catch (error: any) {
            expect(error.message).toEqual("Produto não encontrado");
            expect(error.code).toBe(404);
        }
    });

    test("Caso de error no métado createProduct", async() => {
        expect.assertions(2);
        try {
           const product: IProductDTO = {
            idCategoria: 456,
            codigoSKU: "",
            nome: "nome",
            descricao: "descricao",
            valor: 789,
            status: 456

           }
            await productBusiness.createProduct(product)
            
        } catch (error: any) {
            expect(error.message).toEqual("É necessário preencher todos os compos!");
            expect(error.code).toBe(422);
        }
    });
});