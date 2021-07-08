const Sequelize = require('sequelize');
const postgresDriver = new Sequelize(
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

module.exports = postgresDriver;