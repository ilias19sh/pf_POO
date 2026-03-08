const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const Database = require('./Database')

class Produit {
    constructor() {
        const database = new Database();
        this.conn = database.connect();
        this.table = "produits";

        this.id = null;
        this.nom = null;
        this.description = null;
        this.prix = null;
        this.stock = null;
    }

    async create() {
        const sql = `INSERT INTO ${this.table} (nom, description, prix, stock)
                     VALUES (?, ?, ?, ?)`;

        const [result] = await this.conn.execute(sql, [
            this.nom,
            this.description,
            this.prix,
            this.stock
        ]);

        return result;
    }

    async readAll() {
        const sql = `SELECT * FROM ${this.table}`;
        const [rows] = await this.conn.execute(sql);
        return rows;
    }

    async update() {
        const sql = `UPDATE ${this.table}
                     SET nom=?, description=?, prix=?, stock=?
                     WHERE id=?`;

        const [result] = await this.conn.execute(sql, [
            this.nom,
            this.description,
            this.prix,
            this.stock,
            this.id
        ]);

        return result;
    }

    async delete() {
        const sql = `DELETE FROM ${this.table} WHERE id=?`;
        const [result] = await this.conn.execute(sql, [this.id]);
        return result;
    }
}

class Client {
    constructor() {
        const database = new Database();
        this.conn = database.connect();
        this.table = "clients";

        this.id = null;
        this.nom = null;
        this.email = null;
        this.password = null;
    }

    async create() {
        const hash = await bcrypt.hash(this.password, 10);

        const sql = `INSERT INTO ${this.table} (nom, email, password)
                     VALUES (?, ?, ?)`;

        const [result] = await this.conn.execute(sql, [
            this.nom,
            this.email,
            hash
        ]);

        return result;
    }
}

class Panier {
    constructor() {
        const database = new Database();
        this.conn = database.connect();
        this.table = "panier";

        this.client_id = null;
        this.produit_id = null;
        this.quantite = null;
    }

    async ajouterProduit() {
        const sql = `INSERT INTO ${this.table} (client_id, produit_id, quantite)
                     VALUES (?, ?, ?)`;

        const [result] = await this.conn.execute(sql, [
            this.client_id,
            this.produit_id,
            this.quantite
        ]);

        return result;
    }
}

class Commande {
    constructor() {
        const database = new Database();
        this.conn = database.connect();
        this.table = "commandes";

        this.client_id = null;
        this.total = null;
    }

    async create() {
        const sql = `INSERT INTO ${this.table} (client_id, total)
                     VALUES (?, ?)`;

        const [result] = await this.conn.execute(sql, [
            this.client_id,
            this.total
        ]);

        return result;
    }
}

module.exports = {
    Produit,
    Client,
    Panier,
    Commande
};