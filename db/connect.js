const mongoose = require('mongoose');
const params = require('./params/params');
// const connection = require('./handlers/connection/connection') //? how can i connect it?

mongoose.connect('mongodb://localhost:27017', params)
    .catch((error) => {
        console.log('you are not connected to db')
    })

const db = mongoose.connection

db.once('open', () => {
    console.log(`Connected to DB (db_name: ${params.dbName})`)
})

db.on('error', () => {
    console.log('you have some problem with current connection')
})


module.exports = mongoose
