const ICrud = require('./../interfaces/interface.crud');

class ContextStrategy extends ICrud {
    constructor(strategy) {
        super();
        this._database = strategy;
    }

    async create(item) {
        return this._database.create(item);
    }

    async read(item, skip, limit) {
        return this._database.read(item, skip, limit);
    }

    update(id, item) {
        return this._database.update(id, item);
    }

    delete(id) {
        return this._database.delete(id);
    }

    isConnected() {
        return this._database.isConnected();
    }
}

module.exports = ContextStrategy;