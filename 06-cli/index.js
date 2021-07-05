const Commander = require('commander');
const database = require('./services/database');
const Heroi = require('./heroi');

async function main() {
    Commander
    .version('v1.0.0')
    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-c, --cadastrar', "Cadastar um Heroi")
    .parse(process.argv);

    const heroi = new Heroi(Commander);
console.log(heroi)
    try {
        if(Commander.cadastrar){
            console.log(heroi);
        }
    } catch (error) {
        console.error('Deu ruim!', error);
    }
}

main();