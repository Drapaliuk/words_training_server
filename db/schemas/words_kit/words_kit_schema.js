const mongoose = require('mongoose');

const WordsKitSchema = new mongoose.Schema({
    serviceInfo: {
        type: Object,
        name: String,
    },
    words: Array
})

module.exports = WordsKitSchema;