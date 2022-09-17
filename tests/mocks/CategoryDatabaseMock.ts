import { ICategory, ICategoryDTO } from "../../src/model/category";
import { ICategoryRepository } from "../../src/repository/categoryRepository";


export class CategoryDatabaseMock implements ICategoryRepository {
    async insertCategory(category: ICategory): Promise<void> {
        console.log("categoria adicionada")
    }
    getCategoryAll(): Promise<ICategory[]> {
        throw new Error("Method not implemented.");
    }
    getCategoryById(id: number): Promise<ICategory> {
        throw new Error("Method not implemented.");
    }
    editCategory(id: number, category: ICategoryDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}