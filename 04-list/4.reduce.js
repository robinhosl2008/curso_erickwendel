const { ModuloBusca } = require('./service');


async function main() {
    try {

        const service = new ModuloBusca();
        const resultado = await service.obterPessoas('a');

        const pesos = resultado.results.map( item => parseInt(item.height) );
        
        const menor = pesos.reduce( (a, b) => {
            return (a < b) ? a : b;
        }, 0);

        const maior = pesos.reduce( (a, b) => {
            return (a > b) ? a : b;
        }, 0);

        const total = pesos.reduce( (a, b) => {
            return a + b;
        }, 0);

        console.log("Menor peso: ", menor);
        console.log("Maior peso: ", maior);
        console.log("Peso total: ", total);
        
    } catch (error) {
        console.error("Deu ruim:", error);
    }
}


main();