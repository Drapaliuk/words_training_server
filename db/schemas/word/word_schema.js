const mongoose = require('mongoose');

const wordSchema  = new mongoose.Schema({
    eng: String,
    ukr: String,
})

module.exports = wordSchema;