

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
}

module.exports = main();