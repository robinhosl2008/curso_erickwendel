const assert = require('assert');
const api = require('../api');

var app = {};

describe('Suite de teste da API.', function() {
    this.beforeAll(async () => {
        app = await api;
    });

    it('Listar herois acessando a rota /herois', async () => {
        const resultado = await app.inject({
            method: 'GET',
            url: '/herois'
        });

        const statusCode = resultado.statusCode;
        assert.deepStrictEqual(statusCode, 200, 'Não veio o status code 200.');

        const lista = JSON.parse(resultado.payload);
        assert.ok(Array.isArray(lista));
    });
})