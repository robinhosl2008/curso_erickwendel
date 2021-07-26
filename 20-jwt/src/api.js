const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Context = require('./db/base/contentStrategy');
const MongoDB = require('./db/mongodb/mongodb');
const Connection = require('./db/mongodb/config/connection');
const HeroiSchema = require('./db/mongodb/schemas/heroisSchema');
const HeroiRoutes = require('./routes/heroiRoutes');
const AuthRoutes = require('./routes/authRoutes');

const HapiAuthJWT2 = require('hapi-auth-jwt2');
const JWT_SECRET = 'MINHA_STRING_SEGREDO';

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

const people = { // our "users database"
    1: {
      id: 1,
      name: 'robson'
    }
};
 
// bring your own validation function
const validate = async function (decoded, request) {
 
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return { isValid: false };
    }
    else {
      return { isValid: true };
    }
};

async function init() {
    const context = new Context(new MongoDB(Connection, HeroiSchema));

    await app.register([
        HapiAuthJWT2,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOpgions
        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 60
        // },
        validate
    })

    app.auth.default('jwt');
    
    app.route([
        ...mapRoutes(new HeroiRoutes(context), HeroiRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
    ]);

    await app.start();
    console.log('Servidor rodando em %s', app.info.uri);

    return app;
}

module.exports = init();