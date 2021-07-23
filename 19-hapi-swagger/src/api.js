const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Context = require('./db/base/contentStrategy');
const MongoDB = require('./db/mongodb/mongodb');
const Connection = require('./db/mongodb/config/connection');
const HeroiSchema = require('./db/mongodb/schemas/heroisSchema');
const HeroiRoutes = require('./routes/heroiRoutes');

const app = new Hapi.Server({
    host: 'localhost',
    port: 5000
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
};

const swaggerOpgions = {
    info: {
        title: 'Sistema para controle de herois',
        version: 'v1.0'
    }
};

async function init() {
    const context = new Context(new MongoDB(Connection, HeroiSchema));

    await app.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOpgions
        }
    ]);
    
    app.route(
        mapRoutes(new HeroiRoutes(context), HeroiRoutes.methods())
    );

    await app.start();
    console.log('Servidor rodando em %s', app.info.uri);

    return app;
}

module.exports = init();