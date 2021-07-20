const assert = require('assert');
const api = require('../api');

var app = {};
const DUMMY = {
    nome: "Robson",
    poder: "Inteligência"
};

describe.only('Suite de teste da API.', function() {
    this.beforeAll(async () => {
        app = await api;
    });

    it.only('Cadastrar heroi', async () => {
        const resultado = await app.inject({
            method: 'POST',
            url: `/herois`
        });

        console.log(resultado)
    })

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
        assert.ok((statusCode === 500 || statusCode === 400), true, 'Não veio o status code 200.');
        assert.ok((resultado.statusMessage === 'Internal Server Error' || resultado.statusMessage === 'Bad Request'), 'A mensagem de erro não é a esperada');
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