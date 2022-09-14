import { BaseError } from "../error/BaseError";
import { ICategory, ICategoryDTO } from "../model/category";
import { ICategoryRepository } from "../repository/categoryRepository";
import { BaseDatabase } from "./BaseDatabase";


export class CategoryDatabase extends BaseDatabase implements ICategoryRepository {
    private static TABLE_NAME = "CATEGORIA";

    public async getCategoryAll(): Promise<ICategory[]> {
        try {
            const categoryAll: ICategory[] = await this.getConnection()
                .select("*")
                .from(CategoryDatabase.TABLE_NAME)

            return categoryAll

        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code)
        }
    }

    public async getCategoryById(id: number): Promise<ICategory> {
        const categoryAll: ICategory[] = await this.getConnection()
            .select("*")
            .from(CategoryDatabase.TABLE_NAME)
            .where({ id })

        return categoryAll[0]
    }

    public async insertCategory(category: ICategory): Promise<void> {
        try {
            await this.getConnection()
                .insert(category)
                .from(CategoryDatabase.TABLE_NAME);
        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code)
        }
    }

    public async editCategory(id: number, category: ICategoryDTO): Promise<void> {
        try {
            const {codigo, titulo, status} = category;
            await this.getConnection()
            .select("*")
            .where({id})
            .update({
                codigo: codigo || undefined,
                titulo: titulo || undefined,
                status
            })
            .from(CategoryDatabase.TABLE_NAME);
            
        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code)
        }
    }

    public async deleteCategory(id: number): Promise<void> {
        try {
           await this.getConnection()
           .select("*")
           .delete()
           .where({id})
           .from(CategoryDatabase.TABLE_NAME);
        } catch (error: any) {
            throw new BaseError(error.sqlMessage, error.code)
        }
    }
}