const Sequelize = require('sequelize');

const connection = new Sequelize(
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
        operatorsAliases: 0,
        logging: false
    }
);

module.exports = connection;