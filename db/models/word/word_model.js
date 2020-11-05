const mongoose = require('mongoose');
const wordSchema = require('../../schemas/word/word_schema');
const Word = mongoose.model('words', wordSchema)

module.exports = Word;
