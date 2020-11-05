const mongoose = require('mongoose');
const params = require('./params/params');
// const connection = require('./handlers/connection/connection') //? how can i connect it?

mongoose.connect('mongodb://localhost:27017', params)
    .catch((error) => {
        console.log('some problem with connecting, you are not connected to db')
    })

const db = mongoose.connection

db.once('open', () => {
    console.log(`connected to ${params.dbName}`)
})

db.on('error', () => {
    console.log('you are connected to db? but you have some problem with current connection')
})


module.exports = mongoose
