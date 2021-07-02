const { expect, assert } = require('chai');
const mock = require('./index.mock');
const { StarWars } = require('../utils/api_star_wars');
const nock = require('nock');


describe('Teste para saber se retornou os personagens.', () => {
    
    beforeEach(() => {
        nock('https://swapi.co/api/people')
            .get('/?search=r2-d2&format=json')
            .reply(200, mock());
    });

    it('Deve buscar o R2-D2 com o formato correto.', async () => {
        const apiStarWars = new StarWars();
        const resposta = await apiStarWars.buscaPersonagens('r2-d2');
        // .then((response) => {


            // expect(typeof response).to.equal('object');


            const resultado = resposta.results.map( (pessoa) => {
                if(pessoa.hasOwnProperty('name', 'height')) {
                    return { name: pessoa.name, peso: pessoa.height };
                }
            })

        // })

        
        expect(resposta.results[0].hasOwnProperty('name')).to.equal(true, "Existe!");

        // expect([{ name: 'R2-D2', peso: '96' }]).to.equal(resultado);
        
        // assert.deepStrictEqual(resultado, resultado, 'O nome não é igual.');

        // assert.deepStrictEqual(resultado, [{ name: 'R2-D2', peso: '96' }], 'O R2-D2 não encontrado.');
    });

});