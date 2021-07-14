// npm install mongoose

const Mongoose = require('mongoose');
Mongoose.connect('mongodb://admin:root@localhost:27017/herois?authSource=admin&readPreference=primary&ssl=false', 
    { useUnifiedTopology: true, useNewUrlParser: true},
    function (err) {
        if(!err) return;
        console.log('Falha na conexão!', err);
    });
    
const connection = Mongoose.connection;

connection.once('Open', () => console.log('Conectado ao banco de dados!'));

const state = connection.readyState;
setTimeout(() => {
    console.log('Status da conexão:', state);
}, 1000);

/**
 * 0: Disconectado
 * 1: Conectado
 * 2: Conectando
 * 3: Disconectando
 */

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    }
})

const model = Mongoose.model('herois', heroiSchema);

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    });
    console.log(resultCadastrar);

    const listItens = await model.find();
    console.log(listItens);
}

main();

// async function main() {
//     // Definimos o nosso modelo.
//     const Herois = driver.define('herois', {
//         id: {
//             type: Sequelize.INTEGER,
//             required: true,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         nome: {
//             type: Sequelize.STRING,
//             required: true
//         },
//         poder: {
//             type: Sequelize.STRING,
//             required: true
//         }
//     }, {
//         tableName: 'heroes',
//         freezeTableName: false,
//         timestamps: false
//     });

//     // Sincronizamo com nosso banco de dados.
//     await Herois.sync();

//     // await Herois.create({
//     //     nome: 'Lanterna Verde',
//     //     poder: 'Força do Anel'
//     // });

//     // Fazendo uma consulta no banco.
//     const resultado = await Herois.findAll({
//         attributes: ['id', 'nome', 'poder'],
//         raw: true
//     });

//     console.log(resultado);
// }

// main();