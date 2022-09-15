import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";

export const app = express();
dotenv.config();

app.use(express.json());

const server = app.listen(3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
        console.error(`Falha ao rodar o servidor.`);
    }
});