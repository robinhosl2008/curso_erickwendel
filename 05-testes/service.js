const axios = require('axios');
const URL = 'https://swapi.co/api/people';

class ModuloBusca {
    async obterPessoas(nome) {
        const url = `${URL}/?search=${nome}&format=json`;
        const result = await axios.get(url);
        return result.data;
    }
}

module.exports = { ModuloBusca };


