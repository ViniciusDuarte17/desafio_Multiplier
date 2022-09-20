import { BaseDatabase } from "./BaseDatabase";

export class Migrations extends BaseDatabase {
    createTable = () =>
        this.getConnection()
            .raw(
                `
                CREATE TABLE IF NOT EXISTS CATEGORIA (
                    id INT PRIMARY KEY,
                    codigo VARCHAR(255) NOT NULL,
                    titulo VARCHAR(255) NOT NULL,
                    status INT DEFAULT 0
                );
        
                CREATE TABLE IF NOT EXISTS PRODUTOS (
                    id INT PRIMARY KEY,
                    id_categoria INT NOT NULL,
                    codigo VARCHAR(255) NOT NULL,
                    nome VARCHAR(255) NOT NULL,
                    descricao TEXT NOT NULL,
                    valor FLOAT NOT NULL,
                    status INT DEFAULT 0,
                    FOREIGN KEY(id_categoria) REFERENCES CATEGORIA(id)
                );
                
                CREATE TABLE IF NOT EXISTS ESTOQUE (
                    id INT PRIMARY KEY,
                    id_produto INT NOT NULL,
                    quantidade INT NOT NULL,
                    reserva INT NOT NULL,
                    status INT DEFAULT 0,
                    FOREIGN KEY(id_produto) REFERENCES PRODUTOS(id)
                );
 `
            )
            .then(() => console.log("Tabela criada com sucesso"))
            .catch((error: any) => console.log(error.sqlMessage || error.message));
    closeConnection = () => this.getConnection().destroy();
}

const migrations = new Migrations();
migrations.createTable().finally(migrations.closeConnection);