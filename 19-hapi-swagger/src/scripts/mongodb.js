// docker ps
// docker exec -it <id do container> mongo -u robson -p root --authenticationDatabase herois

// databases
// use herois

// mostrar tables (coleções)
// show collections

// debugger.herois.insert({
//     nome: 'Flash',
//     poder: 'Velocidade'
// })

// db.herois.find()
// db.herois.find.pretty()

// for(let i=0; i<=100; i++) {
//     db.herois.insert({
//         nome: 'Flash',
//         poder: 'Velocidade'
//     })
// }

db.herois.count()
db.herois.findOne()
db.herois.find().limit(10).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 })

// create
db.personagem.insert({
    nome: 'Flash',
    poder: 'Velocidade'
})

// read
db.personagem.find()

// update - Se fizer um update no nome todo o resto do registro
// desaparece. Para burlar isso utilizamos o comando $set para
// dizer exatamente o que queremos modificar.
db.personagem.update({ _id: ObjectId("60e88f42912a7b0072bcc9ea") },
    { $set: { nome: "Homem Aranha", poder: "Poder da aranha"}})

// delete
db.personagem.remove({ _id: ObjectId("60e88f42912a7b0072bcc9ea") })
