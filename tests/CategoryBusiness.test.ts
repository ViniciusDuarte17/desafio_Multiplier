import { CategoryBusiness } from "../src/business/CategoryBusiness";
import { ICategoryDTO } from "../src/model/category";
import { CategoryDatabaseMock } from "./mocks/CategoryDatabaseMock";


const categoryDatabaseMock = new CategoryDatabaseMock()
const categoryBusiness = new CategoryBusiness(categoryDatabaseMock);


describe("Testando a class categoryBusiness", () => {
    test("1. caso de error no metado insertCategory", async() => {
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
    })
})