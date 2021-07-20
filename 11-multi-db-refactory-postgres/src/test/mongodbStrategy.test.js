const assert = require('assert');
const MongoDB = require('../db/mongodb/mongodb');
const Context = require('../db/base/contentStrategy');
const heroiSchema = require('../db/mongodb/schemas/heroisSchema');
const connection = require('../db/mongodb/config/connection');

const context = new Context(new MongoDB(connection, heroiSchema));

const MOCK_HEROI = {
    nome: 'Robson',
    poder: 'Garoto de Programa'
}

var MOCK_HEROI_TO_UPDATE = null;

describe('MongoDB Suite de testes', () => {
    it('Verifica conexão', async () => {
        const resultado = await context.isConnected();
        assert.ok(resultado, 'Conectado');
    })

    it('Cadastrar um heroi', async () => {
        const {id, nome, poder} = await context.create(MOCK_HEROI);
        MOCK_HEROI_TO_UPDATE = id;
        assert.deepStrictEqual({ nome, poder }, MOCK_HEROI, 'Problema ao tentar cadastrar um heroi!');
    })

    it('Listando herois', async () => {
        const herois = await context.read();
        assert.deepStrictEqual(herois.length >= 1, true, 'Não retornou a lista herois.');
    })

    it('Buscando heroi pelo nome', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI.nome });
        assert.deepStrictEqual({ nome, poder }, MOCK_HEROI, 'Não retornou o heroi.');
    })

    it('Atualizar o heroi', async () => {
        const heroiAtualizado = await context.update( 
            MOCK_HEROI_TO_UPDATE, {
                nome: 'Ana',
                poder: 'Medicina'
            }
        );

        assert.deepStrictEqual(heroiAtualizado.ok, 1, 'Heroi não atualizado');
    })

    it('Remover o heroi', async () => {
        const heroiRemovido = await context.delete(MOCK_HEROI_TO_UPDATE);
        assert.deepStrictEqual(heroiRemovido.ok, 1, 'O heroi não foi removido');
    })
})