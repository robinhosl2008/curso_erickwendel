const ICrud = require('./interfaces/interface.crud');

class PostgreSQL extends ICrud {
    constructor() {
        super();
    }

    create(item) {
        console.log('O item foi salvo no PostgreSQL.');
    }
}

module.exports = PostgreSQL;