const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');

const heroiSchema = Joi.object({
    
});

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
                handler: async (request, h) => {
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
                        nome: Joi.string().min(3).max(100)
                    })
                }
            }
        }
    }
}

module.exports = HeroiRoutes;