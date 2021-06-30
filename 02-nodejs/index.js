

/**
 * Promises
 * 
 * 0. Obter um usuário.
 * 1. Obter o número de telefone do usuário pelo id.
 * 2. Obter o endereço do usuário pelo id.
 */

function obterUsuario() {
    return new Promise( (resolve, reject) => {
        try {
            return resolve({
                id: 1,
                nome: "Robson",
                dtNascimento: new Date()
            });
        } catch (error) {
            return reject(new Error('Deu ruim de verdade!', error));
        }
        
    });
}

function obterTelefone(idUsuario) {
    return new Promise( (resolve, reject) => {
        try {
            return resolve({
                numero: "92839-4432",
                ddd: "21"
            })
        } catch (error) {
            return reject(new Error('Deu ruim de verdade!', error));
        }
        
    });
}

function obterEndereco(idUsuario) {
    return new Promise( (resolve, reject) => {
        try {
            return resolve({
                rua: "Rua Irapua",
                numero: "542",
                bairro: "Penha Circular"
            })
        } catch (error) {
            return reject(new Error('Deu ruim de verdade!', error));
        }
    });
}

main();

async function main() {
    try {
        console.time('tempo-execução')
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEndereco(usuario.id);

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEndereco(usuario.id)
        ])

        const telefone = resultado[0];
        const endereco = resultado[1];

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.numero},
            Endereço: ${endereco.rua}, No ${endereco.numero}
        `);

        console.timeEnd("tempo-execução");
    } catch (error) {
        console.error("Deu ruim: ", error)
    }
}

// Pego a promise.
// const usuarioPromise = obterUsuario();

// var dadosUsuario = {};

// Trato a promise.
// usuarioPromise
// .then( (res1) => {
//     dadosUsuario.usuario = res1;
//     return obterTelefone(res1)
//     .then( (res2) => {
//         dadosUsuario.telefone = res2;
//         return obterEndereco(res2)
//         .then( (res3) => {
//             dadosUsuario.endereco = res3
//             console.log(dadosUsuario)
//         })
//     })
// })
// .catch( (error1) => {
//     console.error('Deu ruim: ', error1);
// });




