const mongoose = require('mongoose');
const wordSchema = require('../word/word_schema');

const WordsKitSchema = new mongoose.Schema({
    serviceInfo: {
        type: Object,
        name: wordSchema,
    },
    words: Array
})

module.exports = WordsKitSchema;