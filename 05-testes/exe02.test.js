const assert = require('assert');
const { StarWars } = require('./utils/api_star_wars');

// Instalamos o pacote mock para simular requisições.
const mock = require('mock');

describe('Teste para saber se retornou os personagens.', () => {
    it('Deve buscar o R2-D2 com o formato correto.', async () => {
        const expected = [{ name: 'R2-D2', peso: '96' }];
        const nomeBase = 'r2-d2';

        const apiStarWars = new StarWars();
        const resposta = await apiStarWars.buscaPersonagens(nomeBase);

        const resultado = resposta.results.map( (pessoa) => {
            if(pessoa.hasOwnProperty('name', 'height')) {
                return { name: pessoa.name, peso: pessoa.height };
            }
        })

        assert.deepStrictEqual(resultado, expected, 'O nome não encontrado.');
    });
});


// Array.prototype.myFilter = function(callback) {
//     const lista = [];
//     for(let key in this){
//         const item = this[key];
//         const resultado = callback(item, key, this);
//         if(!resultado) continue;
//         lista.push(resultado);
//     }
//     return lista;
// }

// async function main() {
//     try {
//         const apiStarWars = new StarWars();
//         const resultado = await apiStarWars.buscaPersonagens('r2-d2');
//         console.log(resultado);
//         const names = resultado.results.myFilter((pessoa) => {
//             return pessoa.name;
//         });

//         console.log('nomes:', names);
//     } catch (error) {
//         console.error('Deu ruim na função main: ', error);
//     }
// }




// main();