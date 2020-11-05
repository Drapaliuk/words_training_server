const DBname = 'wordtrainer';
const params  = {
    useNewUrlParser: true, 
    dbName: DBname,
    useCreateIndex: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 3000
}

module.exports = params;