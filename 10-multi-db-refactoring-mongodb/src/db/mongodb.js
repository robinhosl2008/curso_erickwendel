const ICrud = require('./interfaces/interface.crud');
const Mongoose = require('mongoose');
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}
class MongoDB extends ICrud {
    constructor() {
        super();
        this._driver = null
        this._herois = null
        this.connection = null
        this.defineModel();
        this.connect();
    }

    async isConnected(){ 
        const state = STATUS[this.connection.readyState];
        if(state === 'Conectado') return state;
        if(state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 1000));
        return STATUS[this.connection.readyState];
    }

    defineModel() {
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            }
        })
        
        this._herois = Mongoose.model('herois', heroiSchema);
    }

    connect() {
        Mongoose.connect('mongodb://admin:root@localhost:27017/herois?authSource=admin&readPreference=primary&ssl=false', 
        { useUnifiedTopology: true, useNewUrlParser: true},
        function (err) {
            if(!err) return;
            console.log('Falha na conexão!', err);
        });
        
        this.connection = Mongoose.connection;
        this.connection.once('Open', () => console.log('Conectado ao banco de dados!'));
    }

    async create(item) {
        return this._herois.create(item);
    }

    async read(item, skip=0, limit=10) {
        return this._herois.find(item).skip(skip).limit(limit);
    }

    update(id, item) {
        return this._herois.updateOne({_id: id}, {$set: item})
    }

    delete(id) {
        return this._herois.deleteOne({ _id: id })
    }
}

module.exports = MongoDB;