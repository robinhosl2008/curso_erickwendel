const Mongoose = require('mongoose');

Mongoose.connect('mongodb://robson:root@localhost:27017/herois?authSource=admin&readPreference=primary&ssl=false', 
{ 
    useUnifiedTopology: true, 
    useNewUrlParser: true
},
function (err) {
    if(!err) return;
    console.log('Falha na conexão!', err);
});

module.exports = Mongoose.connection;