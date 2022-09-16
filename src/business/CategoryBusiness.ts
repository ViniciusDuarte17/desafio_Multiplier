import { BaseError } from "../error/BaseError";
import { ICategory, ICategoryDTO } from "../model/category";
import { ICategoryRepository } from "../repository/categoryRepository";


export class CategoryBusiness {
    constructor(private categoryDatabase: ICategoryRepository) { }

    public async categoryAll(): Promise<ICategory[]> {

        const result = await this.categoryDatabase.getCategoryAll();

        if (result.length === 0) {
            throw new BaseError("Nenhuma categoria foi encontrada", 404);
        }

        return result;
    }

    public async categoryById(id: number): Promise<ICategory> {

        const result = await this.categoryDatabase.getCategoryById(id);

        if (!result) {
            throw new BaseError("Categoria não encontrada!", 404)
        }

        return result;
    }

    public async insertCategory(category: ICategoryDTO): Promise<void> {

        let { codigo, titulo, status } = category;

        if (!codigo || !titulo) {
            throw new BaseError("Preencha os campos 'condigoSlug' e titulo", 422);
        }

        if (!status) {
            status = 0
        }

        const id = Math.random() * 10 * (35 + 14);
        // Gererando um id aleátoria, costumo usar a biblioteca uui para gerar id
        // Porém estou seguindo o modelo da tabela sugerido

        const inputCategoria: ICategory = {
            id,
            codigo,
            titulo,
            status
        }
        await this.categoryDatabase.insertCategory(inputCategoria);
    }

    public async editCategory(id: number, category: ICategoryDTO): Promise<void> {

        if (!id) {
            throw new BaseError("É necessário informar o id no parms da requição", 422);
        }

        if (
            category.codigo === '' ||
            category.titulo === ''

        ) {
            throw new BaseError("Nenhum dos campos deve estar em branco.", 422)
        }

        if (!category.codigo && !category.titulo) {
            throw new BaseError("Escolha ao menos um valor para editar!", 422)
        }

        await this.categoryDatabase.editCategory(id, category)
    }

    public async deleteCategory(id: number): Promise<void> {

        if (!id) {
            throw new BaseError("É necessário informar o id da categoria", 422);
        }

        const categorai = await this.categoryDatabase.getCategoryById(id);

        if (!categorai) {
            throw new BaseError("categoria não encontrada ou já foi deletada!", 404);
        }

        await this.categoryDatabase.deleteCategory(id);
    }
}