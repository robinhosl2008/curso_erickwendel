const ICrud = require('./interfaces/interface.crud');
const Sequelize = require('sequelize');

class PostgreSQL extends ICrud {
    constructor() {
        super();
        this._driver = null;
        this._herois = null;
        this.connect();
    }

    isConnected() {
        try {
            this.connect();
            return true;
        } catch (error) {
            console.error("A conexão falhou!", error);
            return false;
        }
    }

    async connect() {
        this._driver = new Sequelize(
            // database
            'postgres',
            // usuario
            'robson',
            // senha
            'root',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: 0,
                operatorsAliases: 0
            }
        );

        await this.defineModel();
    }

    // Definimos o nosso modelo.
    async defineModel() {
       this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'heroes',
            freezeTableName: false,
            timestamps: false
        });

        // Sincronizamo com nosso banco de dados.
        this._herois.sync();
    }

    async create(heroi) {
        const { dataValues } = await this._herois.create(heroi);
        return dataValues;
    }

    async read(heroi = {}) {
        return this._herois.findAll({ where: heroi, raw: true });
    }

    async update(id, heroi) {
        return await this._herois.update(heroi, {where: { id: id }});
    }

    async delete(id) {
        return await this._herois.destroy({ where: { id: id }});
    }
}

module.exports = PostgreSQL;