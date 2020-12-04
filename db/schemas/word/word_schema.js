const mongoose = require('mongoose');

const wordSchema  = new mongoose.Schema({
    eng: String,
    ukr: String,
    rus: String
})

module.exports = wordSchema;