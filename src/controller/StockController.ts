import { Request, Response } from "express";
import { StockBusiness } from "../business/StockBusiness";
import { BaseError } from "../error/BaseError";
import { IStockDTO } from "../model/stock";


export class StockController {
    constructor(private stockBunisess: StockBusiness) { };

    public async getStockAll(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const stock = await this.stockBunisess.getStockAll(id);

            res.status(200).send(stock);

        } catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }

    public async updateStock(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const {quantidade, reserva, status} = req.body;

            const inputStock: IStockDTO = {
                quantidade,
                reserva,
                status
            }

            await this.stockBunisess.updateStock(id, inputStock);

            res.status(200).send({message: "Stock editado"});

        } catch (error) {
            if (error instanceof BaseError)
                res.send({ error: error.message }).status(error.code)
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }

}