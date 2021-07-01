const { ModuloBusca } = require('./service');

Array.prototype.myFilter = function(callback) {
    const lista = [];
    for(let key in this){
        const item = this[key];
        const resultado = callback(item, key, this);
        if(!resultado) continue;
        lista.push(resultado);
    }
    return lista;
}

const myColorsArray = ['vermelho', 'azul', 'preto', 'verde', 'violeta'];

async function main(nameOfColor){
    try {
        const service = new ModuloBusca();
        const resultado = await service.obterPessoas('a');

        // const familiaLars = resultado.results.filter((item) => {
        //     // por padrão precisa retornar um booleano.
        //     // para informar se deve manter ou remover da lista
        //     // false > remove da lista.
        //     // true > mantem na lista.
        //     // não encontrou = -1.
        //     // encontrou = posição no array.

        //     return item.name.toLowerCase().indexOf('lars') !== -1;
        // });

        // const names = familiaLars.map( (pessoa) => {
        //     return pessoa.name 
        // });

        const familiaLars = resultado.results.myFilter((pessoa, key) => {
            if(pessoa.name.toLowerCase().indexOf('lars') !== -1){
                return `key: ${key}, nome: ${pessoa.name}`;
            }
        });

        // const listColors = myColorsArray.myFilter( item => {
        //     if(typeof item !== "function" && item.indexOf(nameOfColor) !== -1){
        //         return item;
        //     }
        // });

        console.log(familiaLars);
    } catch (error) {
        console.error("Deu ruim: ", error);
    }
}

main('v');