const service = require('./service');

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = [];
    for (let key = 0; key < this.length; key++) {
        const resultado = callback(this[key], key);
        novoArrayMapeado.push(resultado);
    }
    return novoArrayMapeado;
}

Array.prototype.pegaNome = function (callback) {
    const novoArray = [];
    for(let pessoa of this){
        const resultado = callback(pessoa);
        novoArray.push(resultado);
    }
    return novoArray;
}

async function main() {
    try {
        const resultado = await service.obterPessoas('a');
        // const names = [];

        // console.time('foreach');
        // resultado.results.forEach(item => {
        //     names.push(item.name);
        // });
        // console.timeEnd('foreach');

        // console.time('map');
        // const names = resultado.results.map( (pessoa) => {
        //     return pessoa.name;
        // });
        // console.timeEnd('map');

        // console.time('new-map');
        // const names = resultado.results.map((pessoa) => pessoa.name);
        // console.timeEnd('new-map');

        // const names = resultado.results.meuMap((pessoa, key) => {
        //     return `${key + 1} - ${pessoa.name}`;
        // })

        const names = resultado.results.pegaNome((pessoa) => {
            return pessoa.name;
        });

        console.log('nomes:', names);
    } catch (error) {
        console.error('Deu ruim: ', error);
    }
}




main();
