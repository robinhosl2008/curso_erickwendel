

/**
 * Callbacks
 * 
 * 0. Obter um usuário.
 * 1. Obter o número de telefone do usuário pelo id.
 * 2. Obter o endereço do usuário pelo id.
 */

 function obterUsuario(callback) {
    setTimeout( () => {
        return callback(null, {
            id: 1,
            nome: "Robson",
            dtNascimento: new Date()
        });
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout( () => {
        return callback(null, {
            telefone: "92839-4432",
            ddd: "21"
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout( () => {
        return callback(null, {
            rua: "Rua Irapua",
            numero: "542",
            bairro: "Penha Circular"
        })
    }, 3000);
}

obterUsuario((error, usuario) => {
    if(error){
        console.error('Deu ruim no usuário: ', error);
        return;
    }
    console.log(usuario);
    obterTelefone(usuario.id, (error1, telefone) => {
        if(error1){
            console.error('Deu ruim no telefone: ', error1);
            return;
        }
        console.log(telefone);
        obterEndereco(usuario.id, (error2, endereco) => {
            if(error2){
                console.error('Deu ruim no endereco: ', error2);
                return;
            }
            console.log(endereco);
        });
    });
});




