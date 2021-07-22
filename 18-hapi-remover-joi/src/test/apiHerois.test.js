const assert = require('assert');
const api = require('../api');

var app = {};
var idHeroi = '';

const MOCK_HEROI = {
    nome: 'Teste100',
    poder: 'Teste100'
};

describe('Suite de teste da API.', function() {
    this.beforeAll(async () => {
        app = await api;
    });

    it('Cadastrar um heroi', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: MOCK_HEROI
        });
        
        const statusCode = res.statusCode;
        const jsonPayload = JSON.parse(res.payload);
        const heroiCadastrado = { 
            nome: jsonPayload.nome,
            poder: jsonPayload.poder
        };
        idHeroi = jsonPayload._id;
        
        assert.ok(statusCode === 200);
        assert.deepStrictEqual(heroiCadastrado, MOCK_HEROI);
        assert.notDeepStrictEqual(idHeroi, undefined || '');
    });

    it('Lista todos os herois', async () => {
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

    it('Verificando se os parâmetros na url são do tipo inteiro', async () => {
        const TAMANHO_LIMIT = 'AAA';
        var resultado = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}&nome=${MOCK_HEROI.nome}`
        });

        var statusCode = resultado.statusCode;
        assert.ok((statusCode === 500 || statusCode === 400), true, 'Não veio o status code 200.');
        assert.ok((resultado.statusMessage === 'Internal Server Error' || resultado.statusMessage === 'Bad Request'), 'A mensagem de erro não é a esperada');
    })

    it('Buscar um heroi pelo nome', async () => {
        var resultado = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=3&nome=${MOCK_HEROI.nome}`
        });

        var statusCode = resultado.statusCode;
        assert.deepStrictEqual(statusCode, 200, 'Não veio o status code 200.');
        
        var [data] = JSON.parse(resultado.payload);
        assert.ok(data.nome === MOCK_HEROI.nome, true);
    })

    it('PATCH - Atualizar o nome de um heroi', async () => {
        const res = await app.inject({
            method: 'PATCH',
            url: `/herois/${idHeroi}`,
            payload: { 
                nome: 'Ana' 
            }
        });

        const statusCode = res.statusCode;
        const mensagem = JSON.parse(res.payload).mensagem;

        assert.deepStrictEqual(statusCode, 200);
        assert.ok(mensagem, 'Heroi atualizado com sucesso');
    })

    it('DELETE - Remover o heroi', async () => {
        const res = await app.inject({
            method: 'DELETE',
            url: `/herois/${idHeroi}`
        });

        const statusCode = res.statusCode;
        const dados = JSON.parse(res.payload);

        assert.ok(statusCode === 200);
        assert.deepStrictEqual(dados.message, 'Heroi removido com sucesso');
    })
})