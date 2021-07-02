const assert = require('assert');
const { expect } = require('chai');
const { StarWars } = require('./utils/api_star_wars');

// Instalamos o pacote mock para simular requisições.
const nock = require('nock');


describe('Teste para saber se retornou os personagens.', () => {

    beforeEach(() => {
    nock('https://swapi.co/api/people')
        .get('/?search=r2-d2&format=json')
        .reply(200, {
                count: 1,
                next: null,
                previous: null,
                results: [{
                    name: 'R2-D2',
                    height: '96',
                    mass: '32',
                    hair_color: 'n/a',
                    skin_color: 'white, blue',
                    eye_color: 'red',
                    birth_year: '33BBY',
                    gender: 'n/a',
                    homeworld: 'https://swapi.dev/api/planets/8/',
                    created: '2014-12-10T15:11:50.376000Z',
                    edited: '2014-12-20T21:17:50.311000Z',
                    url: 'https://swapi.dev/api/people/3/'
                }]
            }
        );
    });



    it('Deve buscar o R2-D2 com o formato correto.', async () => {
        const expected = [{ name: 'R2-D2', peso: '96' }];
        const nomeBase = 'r2-d2';

        const apiStarWars = new StarWars();
        const resposta = await apiStarWars.buscaPersonagens(nomeBase);
        console.log(resposta);
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