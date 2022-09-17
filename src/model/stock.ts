

export interface IStock {
    id: number,
    id_produto: number,
    quantidade: number,
    reserva: number,
    status?: number
}
export interface IStockDTO {
    quantidade: number,
    reserva: number,
    status?: number
}
