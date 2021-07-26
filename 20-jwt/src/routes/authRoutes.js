const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');
const jwt = require('jsonwebtoken');

const failAction = (request, headers, error) => {
    throw error;
};

const USER = {
    client_id: 'robson',
    client_secret: '123456'
}

class AuthRoutes extends BaseRoute {
    constructor(secret) {
        super();
        this.secret = secret;
    }
    
    login() {
        return {
            path: '/login',
            method: 'POST',
            options: {
                auth: false,
                handler: async (request) => {
                    try {
                        const { client_id, client_secret } = request.payload;
                        
                        if(client_id.toLowerCase() !== USER.client_id || client_secret !== USER.client_secret) {
                            return Boom.unauthorized();
                        }
                        
                        const token = jwt.sign({
                            client_id: client_id,
                            id: 1
                        }, this.secret);

                        return JSON.stringify({
                            token: token,
                            type: 'Bearer'
                        });
                    } catch (error) {
                        
                    }
                },
                tags: ['api'],
                description: 'Realiza o login',
                notes: 'Pega o token para consumir as funcionalidades da API',
                validate: {
                    payload: Joi.object({
                        client_id: Joi.string().required(),
                        client_secret: Joi.string().required()
                    })
                }
            }
        }
    }

}

module.exports = AuthRoutes;