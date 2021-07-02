const { expect, assert } = require('chai');
const mock = require('./index.mock');
const { StarWars } = require('../utils/api_star_wars');
const nock = require('nock');

const apiStarWars = new StarWars();

describe('Teste Star Wars.', () => {
    
    let resposta = "";
    beforeEach(async () => {
        nock('https://swapi.co/api/people')
            .get('/?search=r2-d2&format=json')
            .reply(200, mock());

        resposta = await apiStarWars.buscaPersonagens('r2-d2');
    });

    it('Deve buscar o parâmetro "name" corretamente.', async () => {
        assert.deepStrictEqual(resposta.results[0].hasOwnProperty('name'), true, 'Não retornou o parâmetro "name" corretamente!');
    });

    it('Deve retornar no parâmetro "name" o nome "R2-D2".', async () => {
        console.log(resposta.results[0].name)
        assert.deepStrictEqual(resposta.results[0].name, 'R2-D2', 'O nome não é o esperado "R2-D2".')
    });
});