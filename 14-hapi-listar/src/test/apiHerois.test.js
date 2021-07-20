const assert = require('assert');
const api = require('../api');

var app = {};

describe('Suite de teste da API.', function() {
    this.beforeAll(async () => {
        app = await api;
    });

    it('Listar herois acessando a rota /herois', async () => {
        var resultado = await app.inject({
            method: 'GET',
            url: '/herois'
        });

        var statusCode = resultado.statusCode;
        assert.deepStrictEqual(statusCode, 200, 'Não veio o status code 200.');

        var lista = JSON.parse(resultado.payload);
        assert.ok(Array.isArray(lista));
    });

    it('Listar /herois deve retornar somente 10 resgistros', async () => {
        const TAMANHO_LIMIT = 10;
        var resultado = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        });

        var statusCode = resultado.statusCode;
        assert.deepStrictEqual(statusCode, 200, 'Não veio o status code 200.');

        var lista = JSON.parse(resultado.payload);
        assert.ok(lista.length === TAMANHO_LIMIT);
    })

    it('Verificando se os parâmetros na url que são do tipo inteiro podem ser string', async () => {
        const TAMANHO_LIMIT = 'AAA';
        var resultado = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}&nome=Robson`
        });

        var statusCode = resultado.statusCode;
        assert.deepStrictEqual(statusCode, 200, 'Não veio o status code 200.');
        
        var data = JSON.parse(resultado.payload);
        assert.ok(data.length > 1);
    })

    it('Buscar um heroi pelo nome', async () => {
        const TAMANHO_LIMIT = 3;
        const NOME = 'Ana'
        var resultado = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}&nome=${NOME}`
        });

        var statusCode = resultado.statusCode;
        assert.deepStrictEqual(statusCode, 200, 'Não veio o status code 200.');
        
        var [data] = JSON.parse(resultado.payload);
        assert.ok(data.nome === NOME);
    })
})