import { ICategory, ICategoryDTO } from "../../src/model/category";
import { ICategoryRepository } from "../../src/repository/categoryRepository";


export class CategoryDatabaseMock implements ICategoryRepository {
    async insertCategory(category: ICategory): Promise<void> {
        console.log("categoria adicionada")
    }
    async getCategoryAll(): Promise<ICategory[]> {
        const categoryMock: ICategory[] = [
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
        return categoryMock
    }
    async getCategoryById(id: number): Promise<any> {
        const categoryMock: ICategory =
        {
            id: 23,
            codigo: "codigo",
            titulo: "titulo",
            status: 0
        }
        if (categoryMock.id === id) {
            return categoryMock
        } else {
            return undefined
        }
    }
    async editCategory(id: number, category: ICategoryDTO): Promise<void> {

    }
    async deleteCategory(id: number): Promise<void> {
        const category = {

            id: 23,
            codigo: "codigo",
            titulo: "titulo",
            status: 0

        }
        if(category.id === id) {
             "deletado com sucesso"
        } else {
          "error ao deletar category"
        }
    }

}