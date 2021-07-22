const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');

const failAction = (request, headers, error) => {
    throw error;
};

class HeroiRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            options: {
                handler: async (request) => {
                    try {
                        const { skip, limit, nome } = request.query;

                        const query = nome ? {
                            nome: {
                                $regex: `.*${nome}*.`
                            }
                        } : {}

                        return this.db.read(query, parseInt(skip), parseInt(limit));
                    } catch (error) {
                        console.log('Deu ruim:', error);
                        return "Erro interno do servidor.";
                    }
                },
                validate: {
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(50)
                    })
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            options: {
                handler: async (request, h) => {
                    try {
                        const { nome, poder } = request.payload;
                        const res = await this.db.create({ nome, poder });
                        
                        return h.response(res)
                    } catch (error) {
                        console.log('Deu ruim:', error);
                        return "Erro interno do servidor.";
                    }
                },
                validate: {
                    payload: Joi.object({
                        nome: Joi.string().required().min(3).max(30),
                        poder: Joi.string().required().min(3).max(50)
                    })
                }
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            options: {
                handler: async (response) => {
                    try {
                        const { id } = response.params;
                        const { payload } = response;

                        const dadosStringfy = JSON.stringify(payload);
                        const dados = JSON.parse(dadosStringfy);

                        const a = this.db.update(id, dados);
                        
                        return { mensagem: 'Heroi atualizado com sucesso' };
                    } catch (error) {
                        console.log('Deu ruim:', error);
                        return "Erro interno do servidor.";
                    }
                },
                validate: {
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    payload: Joi.object({
                        nome: Joi.string().min(3).max(50),
                        poder: Joi.string().min(3).max(50)
                    })
                }
            }
        }
    }

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            options: {
                handler: async (request) => {
                    try {
                        const { id } = request.params;
                        const res = this.db.remove({
                            id
                        });

                        return 'Heroi removido com sucesso';
                    } catch (error) {
                        console.log('Deu ruim:', error);
                        return "Erro interno do servidor.";
                    }
                },
                validate: {
                    params: Joi.object({
                        id: Joi.string().required()
                    })
                }
            }
        }
    }
}

module.exports = HeroiRoutes;