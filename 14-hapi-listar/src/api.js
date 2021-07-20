const hapi = require('hapi');
const Context = require('./db/base/contentStrategy');
const MongoDB = require('./db/mongodb/mongodb');
const Connection = require('./db/mongodb/config/connection');
const HeroiSchema = require('./db/mongodb/schemas/heroisSchema');
const HeroiRoutes = require('./routes/heroiRoutes');

const app = new hapi.Server({
    port: 5000
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function init() {
    const context = new Context(new MongoDB(Connection, HeroiSchema));
    
    app.route([
        ...mapRoutes(new HeroiRoutes(context), HeroiRoutes.methods())
    ]);

    await app.start();
    console.log('Servidor rodando na em %s', app.info.uri);

    return app;
}

module.exports = init();