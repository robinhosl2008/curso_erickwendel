const assert = require('assert');
const MongoDB = require('../db/mongodb');
const Context = require('../db/base/contentStrategy');

const context = new Context(new MongoDB());
const MOCK_HEROI = {
    nome: 'Robson',
    poder: 'Inteligência'
}

describe('MongoDB Suite de testes', () => {
    it('Verifica conexão', async () => {
        const resultado = await context.isConnected();
        assert.ok(resultado, 'Conectado');
    })

    it('Cadastrar um heroi', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI);
        assert.deepStrictEqual({ nome, poder }, MOCK_HEROI, 'Problema ao tentar cadastrar um heroi!');
    })

    it.only('Listando herois', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI.nome });
        console.log({ nome, poder })
        assert.deepStrictEqual({ nome, poder }, MOCK_HEROI, 'Não retornou nenhum heroi.');
    })
})







// describe('Postgres Strategy', () => {
//     it('PostgreSQL Connection', async () => {
//         const result = await context.isConnected();
//         assert.deepStrictEqual(result, true, 'Teste de conexão não passou!');
//     })

    // it('Cadastrar um heroi', async () => {
    //     const resultado = await context.create(MOCK_HEROI);
    //     delete resultado.id;
    //     assert.deepStrictEqual(resultado, MOCK_HEROI, 'Problema ao tentar cadastrar um heroi!');
    // })

//     it('Listar todos os herois', async () =>{ 
//         const resultado = await context.read();
//         assert.ok(resultado.length > 0, true, '');
//     })

//     it('Buscar o heroi cadastrado chamado Robson', async () =>{ 
//         const [resultado] = await context.read({ nome: MOCK_HEROI.nome });
//         delete resultado.id;
//         assert.deepStrictEqual(resultado, MOCK_HEROI, 'O heroi Robson não foi encontrado.');
//     })

//     it('Atualizar o poder do heroi Robson', async () => {
//         // Criando o objeto a ser modificado.
//         var [heroi] = await context.read({ nome: MOCK_HEROI.nome });
//         const updateHeroi = {
//             ...MOCK_HEROI,
//             poder: 'Luva do Poder'
//         };
        
//         // Realiza a atualização no heroi.
//         const [resultado] = await context.update(heroi.id, updateHeroi);

//         assert.ok(resultado, true);

//         const [updatedHeroi] = await context.read({ nome: updateHeroi.nome });

//         assert.deepStrictEqual(updatedHeroi.poder, updateHeroi.poder);
//     })

//     it('Remover um heroi por id', async () => {
//         const [heroiToRemove] = await context.read({ nome: MOCK_HEROI.nome });
//         const resultado = await context.delete(heroiToRemove.id);
//         assert.ok(resultado, true);
//     })
// })
