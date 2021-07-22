const connection = require('../config/connection');
const Sequelize = require('sequelize');

var heroiSchema = connection.define('herois', {
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
heroiSchema.sync();

module.exports = heroiSchema;