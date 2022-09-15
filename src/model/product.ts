
export interface IProduct {
    id: number,
    idCategoria: number,
    codigoSKU: string,
    nome: string,
    descricao: string,
    valor: number,
    status?: number
}
export interface IProductDTO {
    idCategoria?: number,
    codigoSKU: string,
    nome: string,
    descricao: string,
    valor: number
    status?: number
}

export interface IProductDB {
    id: number,
    id_categoria: number,
    codigo: string,
    nome: string,
    descricao: string,
    valor: number,
    status: number
}