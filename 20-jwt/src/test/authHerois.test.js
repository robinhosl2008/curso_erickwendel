const assert = require('assert');
const api = require('../api');
var app = {};
var oToken = '';

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api
    });

    it('Obter um token', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                client_id: 'robson',
                client_secret: '123456'
            }
        });

        const statusCode = res.statusCode;
        const token = JSON.parse(res.payload).token;
        oToken = token;

        assert.deepStrictEqual(statusCode, 200);
        assert.ok(token.length > 20);
    })
})