const service = require('./service');

async function main() {
    try {
        const resultado = await service.obterPessoas('a');
        // const names = [];

        // console.time('foreach');
        // resultado.results.forEach(item => {
        //     names.push(item.name);
        // });
        // console.timeEnd('foreach');

        console.time('map');
        const names = resultado.results.map( (pessoa) => {
            return pessoa.name;
        });
        console.timeEnd('map');

        console.log('nomes:', names);
    } catch (error) {
        console.error('Deu ruim: ', error);
    }
}




main();
