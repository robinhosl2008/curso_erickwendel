

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
                telefone: "92839-4432",
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

// Pego a promise.
const usuarioPromise = obterUsuario();

var dadosUsuario = {};

// Trato a promise.
usuarioPromise
.then( (res1) => {
    dadosUsuario.usuario = res1;
    return obterTelefone(res1)
    .then( (res2) => {
        dadosUsuario.telefone = res2;
        return obterEndereco(res2)
        .then( (res3) => {
            dadosUsuario.endereco = res3
            console.log(dadosUsuario)
        })
    })
})
.catch( (error1) => {
    console.error('Deu ruim: ', error1);
});

// obterUsuario((error, usuario) => {
//     if(error){
//         console.error('Deu ruim no usuário: ', error);
//         return;
//     }
//     console.log(usuario);
//     obterTelefone(usuario.id, (error1, telefone) => {
//         if(error1){
//             console.error('Deu ruim no telefone: ', error1);
//             return;
//         }
//         console.log(telefone);
//         obterEndereco(usuario.id, (error2, endereco) => {
//             if(error2){
//                 console.error('Deu ruim no endereco: ', error2);
//                 return;
//             }
//             console.log(endereco);
//         });
//     });
// });




