const { ModuloBusca } = require('./service');

async function main() {
    try {
        const service = new ModuloBusca();
        const resultado = await service.obterPessoas('a');

        const names = [];

        // console.time('for');
        // for(let i = 0; i < resultado.results.length; i++){
        //     if(resultado.results.hasOwnProperty(i)){
        //         const pessoa = resultado.results[i];
        //         names.push(pessoa.name);
        //     }
        // }
        // console.timeEnd('for');

        // console.time('for-in');
        // for(let i in resultado.results){
        //     if(resultado.results.hasOwnProperty(i)){
        //         names.push(resultado.results[i].name);
        //     }
        // }
        // console.timeEnd('for-in');

        // console.time('for-of');
        for(let pessoa of resultado.results){
            if(pessoa.hasOwnProperty('name')){
                names.push(pessoa.name);
            }
        }
        // console.timeEnd('for-of');
        
        console.log('names:', names);
    } catch (error) {
        console.error('Erro interno:', error);
    }
}

main();