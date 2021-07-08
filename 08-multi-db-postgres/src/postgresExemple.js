// npm install sequelize pg-hstore pg

const Sequelize = require('sequelize');
const driver = new Sequelize(
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

async function main() {
    // Definimos o nosso modelo.
    const Herois = driver.define('herois', {
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
    await Herois.sync();

    // await Herois.create({
    //     nome: 'Lanterna Verde',
    //     poder: 'Força do Anel'
    // });

    // Fazendo uma consulta no banco.
    const resultado = await Herois.findAll({
        attributes: ['id', 'nome', 'poder'],
        raw: true
    });

    console.log(resultado);
}

main();