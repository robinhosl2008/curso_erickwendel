const ICrud = require('../interfaces/interface.crud');
const Mongoose = require('mongoose');

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super();
        this._schema = schema;
        this.connection = connection;
    }

    async isConnected(){ 
        const state = STATUS[this.connection.readyState];
        if(state === 'Conectado') return state;
        if(state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 1000));
        return STATUS[this.connection.readyState];
    }

    async create(item) {
        return this._schema.create(item);
    }

    async read(item, skip=0, limit=10) {
        return this._schema.find(item).skip(skip).limit(limit);
    }

    update(id, item) {
        return this._schema.updateOne({_id: id}, {$set: item})
    }

    delete(id) {
        return this._schema.deleteOne({ _id: id })
    }
}

module.exports = MongoDB;