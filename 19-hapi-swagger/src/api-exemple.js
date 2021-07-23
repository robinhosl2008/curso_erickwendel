const hapi = require('hapi');
const Context = require('./db/base/contentStrategy');
const MongoDB = require('./db/mongodb/mongodb');
const Connection = require('./db/mongodb/config/connection');
const HeroiSchema = require('./db/mongodb/schemas/heroisSchema');

const app = new hapi.Server({
    port: 3000
});

async function init() {
    const context = new Context(new MongoDB(Connection, HeroiSchema));
    
    app.route([
        {
            path: '/herois',
            method: 'GET',
            handler: (request, head) => {
                return context.read();
            }
        }
    ]);

    await app.start();
    console.log('Servidor rodando na em %s', app.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();