const ICrud = require('../interfaces/interface.crud');
const Sequelize = require('sequelize');

class PostgreSQL extends ICrud {
    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;
    }

    isConnected() {
        try {
            if(this._connection)
                return true;
        } catch (error) {
            console.error("A conexão falhou!", error);
            return false;
        }
    }

    async create(heroi) {
        const { dataValues } = await this._schema.create(heroi);
        return dataValues;
    }

    async read(heroi = {}) {
        return this._schema.findAll({ where: heroi, raw: true });
    }

    async update(id, heroi) {
        return await this._schema.update(heroi, {where: { id: id }});
    }

    async delete(id) {
        return await this._schema.destroy({ where: { id: id }});
    }
}

module.exports = PostgreSQL;