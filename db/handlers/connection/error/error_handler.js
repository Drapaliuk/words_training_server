const connection = require('../connection')

connection.once('open', () => {
    console.log(`connected to ${params.dbName}`)
})

