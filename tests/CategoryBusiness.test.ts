import { CategoryBusiness } from "../src/business/CategoryBusiness";
import { ICategory, ICategoryDTO } from "../src/model/category";
import { CategoryDatabaseMock } from "./mocks/CategoryDatabaseMock";


const categoryDatabaseMock = new CategoryDatabaseMock()
const categoryBusiness = new CategoryBusiness(categoryDatabaseMock);


describe.skip("Testando a class categoryBusiness", () => {
    test("1. caso de error no métado insertCategory", async() => {
        try {
            expect.assertions(3);
            const inputCategory: ICategoryDTO = {
                codigo: '',
                titulo: "titulo",
                status: 0
            }
            await categoryBusiness.insertCategory(inputCategory)
        } catch (error: any) {
            expect(error).toBeDefined();
            expect(error.message).toEqual("Preencha os campos 'condigoSlug' e titulo");
            expect(error.code).toEqual(422);
        }
    });
    test("2. caso de sucesso no métado insertCategory", async() => {
        try {
            expect.assertions(1);
            const inputCategory: ICategoryDTO = {
                codigo: 'codigo',
                titulo: "titulo",
                status: 0
            }
           const result = await categoryBusiness.insertCategory(inputCategory)
            expect(result).toBe("categoria adicionada")
        } catch (error) { }
    });

    test("3. endpoint de pegar todos os dados da categoria", async() => {
        try {
            expect.assertions(1);
            const categoryTexte: ICategory[] = [
                {
                    id: 23,
                    codigo: "codigo",
                    titulo: "titulo",
                    status: 0
                },
                {
                    id: 24,
                    codigo: "codigo24",
                    titulo: "titulo24",
                    status: 1
                }
            ]

            const result = await categoryBusiness.categoryAll()
            expect(result).toEqual(categoryTexte);
            
        } catch (error) { }
    });

    test("4. endpoint de pegar categoria por id", async() => {
        try {
            expect.assertions(1);
            const id = 23;
            const categoryTexte = 
                {
                    id: 23,
                    codigo: "codigo",
                    titulo: "titulo",
                    status: 0
                }
             
            const result = await categoryBusiness.categoryById(id);
            expect(result).toEqual(categoryTexte);
            
        } catch (error) { }
    });

    test("5. caso de error no métado 'editCategory' ", async () => {
        try {
            expect.assertions(3);

            const id = 23
            const inputCategory: ICategoryDTO = {
              codigo: "",
              titulo: "titulo",
              status: 1
            }
            await categoryBusiness.editCategory(id, inputCategory)
            
        } catch (error: any) {
            expect(error).toBeDefined();
            expect(error.message).toBe("Nenhum dos campos deve estar em branco.");
            expect(error.code).toBe(422);
        }
    });

    test("6. caso de sucesso no métado 'editCategory' salva a nova informação no banco. ", async () => {
        try {
            expect.assertions(1);

            const id = 23
            const inputCategory: ICategoryDTO = {
              codigo: "codigo",
              titulo: "titulo",
              status: 1
            }
           const result = await categoryBusiness.editCategory(id, inputCategory);
           expect(result).toBeDefined();
    
        } catch (error) {}
    });

    test("7. caso de error no métado 'deleteCategory' deletando category no banco. ", async () => {
        try {
            expect.assertions(1);
            const id = 23
    
           const result = await categoryBusiness.deleteCategory(id);
           expect(result).toBeDefined();
      
        } catch (error) {}
    });
})