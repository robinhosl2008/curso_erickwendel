// Permite trabalhar com arquivos.
const fs = require('fs');

// Transforma a função que trabalha com callback pra promise.
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Database {
    constructor() {
        this.NOME_ARQUIVO = __dirname + '/herois.json';
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
        return true;
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo();
        const id = heroi.id == 1 ? heroi.id : Date.now();

        heroi.id = id;
        const heroiComId = {
            ...heroi
        }

        dados.push(heroiComId)

        return await this.escreverArquivo(dados);
    }

    async listar(nome) {
        const dados = await this.obterDadosArquivo();
        return dados.filter( item => (nome ? (item.nome === nome) : true));
    }

    async remover(id) {
        if (!id) {
            return await this.escreverArquivo([])
        }
        
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if(indice === -1){
            throw Error('O usuário informado não existe.');
        }

        dados.splice(indice, 1);
        return await this.escreverArquivo(dados);
    }
}

module.exports = new Database();