const BaseRoute = require('./base/baseRoute');

class HeroiRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query;

                    let query = {};
                    if (nome) {
                        query.nome = nome;
                    }

                    if ((skip && isNaN(skip)) || (limit && isNaN(limit))) {
                        console.log('O tipo dos parâmetros está incorreto.');
                    }

                    return this.db.read(query, parseInt(skip), parseInt(limit));

                } catch (error) {
                    console.log('Deu ruim:', error);
                    return "Erro interno do servidor.";
                }
                
            }
        }
    }
}

module.exports = HeroiRoutes;