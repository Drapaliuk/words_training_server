const mongoose = require('mongoose');

const VocabularyLevelsDescribes = new mongoose.Schema({
    name: String,
    describe: String
})

module.exports = VocabularyLevelsDescribes;