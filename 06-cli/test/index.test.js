const assert = require('assert');

const database = require('../services/database');

const DEFAULT_ITEM_CADASTRAR = [{
    id: 1,
    nome: 'Flash',
    poder: 'Speed'
}];

var expected = "";

describe('Manipulação de herois - Read.', () => {

    beforeEach( async () => {
        expected = database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    });

    it('A lista de herois não deve ser vazia.', async () => {
        const resultado = await database.listar();

        assert.deepStrictEqual(resultado.length > 0, true);
    });

    it('A busca por um heroi não deve ser vazia.', async () => {
        const resultado = await database.listar("Robson");

        assert.deepStrictEqual(resultado.length == 1, true);
    });

    it('Deve retornar um array vazio quando não encontra o heroi por id.', async () => {
        const resultado = await database.listar(0);

        assert.ok(resultado, []);
    });
});


describe('Manipulação de herois - Create.', () => {

    it('Cadastrar um heroi.', async () => {
        const confirmacao = await database.cadastrar({ nome: "Ana", poder: "Inteligência" });
        
        assert.deepStrictEqual(confirmacao, true);
    });

});