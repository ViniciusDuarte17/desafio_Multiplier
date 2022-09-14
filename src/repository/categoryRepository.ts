import { ICategory, ICategoryDTO } from "../model/category";


export interface ICategoryRepository {
    insertCategory(category: ICategory): Promise<void>
    getCategoryAll (): Promise<ICategory[]>
    getCategoryById(id: number): Promise<ICategory>
    editCategory(id: number, category: ICategoryDTO): Promise<void>
    deleteCategory(id: number): Promise<void>
}