const Commander = require('commander');
const database = require('./services/database');
const Heroi = require('./heroi');

async function main() {
    Commander
    .version('v1.0.0')
    .option('-a, --action [value]', "Ação")
    .option('-i, --id [value]', "ID do Heroi")
    .option('-n, --name [value]', "Nome do Heroi")
    .option('-p, --power [value]', "Poder do Heroi")
    .option('-h, --help')
    .parse(process.argv);

    const heroi = new Heroi(Commander.opts());
    var resultado = undefined;
    
    try {
        switch (Commander.opts().action) {
            case "create":
                /**
                 * A linha (25) é utilizada para remover o
                 * id caso tenha sido informado aqui.
                 */ 
                delete heroi.id;

                resultado = await database.cadastrar(heroi);
                if(!resultado){
                    console.error("Heroi não foi cadastrado!");
                    return;
                }
                console.log("Heroi cadastrado!");
                break;

            case "read":
                resultado = await database.listar(heroi.nome)
                if(!resultado){
                    console.error("Nenhum heroi encontrado!");
                    return;
                }
                console.log(resultado);
                break;

            case "update": 
                resultado = await database.atualizar(heroi.id, heroi);
                if(!resultado){
                    console.error("Erro ao editar o heroi!");
                    return;
                }
                console.log(heroi);
                break;

            case "delete":
                resultado = await database.remover(heroi.id);
                if(!resultado){
                    console.error("Erro ao remover o heroi!");
                    return;
                }
                console.log("Heroi removido com sucesso!");
                break;
        
            default:
                break;
        }
        
        if(Commander.opts().help){
            console.log(`

            HH   HH EEEEEEE RRRRR    OOOOO
            HH   HH EE      RR   RR OO   OO
            HHHHHHH EEEEE   RRRRR   OO   OO
            HH   HH EE      RR  RR  OO   OO
            HH   HH EEEEEEE RR   RR  OOOOO

            Run 'yarn hero <options>' to execute 
            functions using command line.
            ____________________________________________
                -V, --version   Show version of hero.
                -a, --action    Describe what action to 
                                run passing 'create', 
                                'read', 'update' or 
                                'delete'.
                -i, --id        ID of hero.
                -n, --name      Name of hero.
                -p, --power     Power of hero.
                -h, --help      Show all options.
            `);
        }
    } catch (error) {
        console.error('Deu ruim!', error);
    }
}

main();