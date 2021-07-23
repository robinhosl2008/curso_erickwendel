const ContextStrategy = require('./db/strategis/base/contentStrategy');
const MongoDB = require('./db/strategis/mongodb');
const PostgreSQL = require('./db/strategis/postgres');

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

const contextPostg = new ContextStrategy(new PostgreSQL());
contextPostg.create();