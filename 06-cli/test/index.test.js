const assert = require('assert');

const database = require('../services/database');

const DEFAULT_ITEM_CADASTRAR = {
    id: 1,
    nome: 'Flash',
    poder: 'Speed'
};

const DEFAULT_ITEM_ATUALIZAR = {
    id: 1,
    nome: 'Lanterna',
    poder: 'Poder do Anél'
};

var expected = "";

describe('Manipulação de herois - Create.', () => {

    it('Cadastrar um heroi.', async () => {
        const confirmacao = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        assert.deepStrictEqual(confirmacao, true);

    });

});

describe('Manipulação de herois - Read.', () => {

    beforeEach(() => {
        expected = DEFAULT_ITEM_CADASTRAR;
    });


    // beforeEach( async () => {
    //     expected = database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    // });


    it('A lista de herois não deve ser vazia.', async () => {
        const resultado = await database.listar();
        assert.deepStrictEqual(resultado.length > 0, true);
    });

    it('A busca por um heroi não deve ser vazia.', async () => {
        const resultado = await database.listar("Flash");
        assert.deepStrictEqual(resultado.length == 1, true);
    });

    it('Deve retornar um array vazio quando não encontra o heroi por id.', async () => {
        const resultado = await database.listar(0);
        assert.ok(resultado, []);
    });
});

describe('Manipulação de herois - Update.', () => {
    it('Deverá atualizar os dados de um heroi.', async () => {
        const resultado = await database.atualizar(DEFAULT_ITEM_CADASTRAR.id, DEFAULT_ITEM_ATUALIZAR);
        assert.deepStrictEqual(resultado, true);
    });
});

describe('Manipulação de herois - Delete.', () => {
    it('Deve remover um heroi por ID.', async () => {
        var resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
        assert.deepStrictEqual(resultado, true, 'O registro não foi removido.');
    });
});


