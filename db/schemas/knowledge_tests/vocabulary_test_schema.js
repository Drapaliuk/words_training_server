const mongoose = require('mongoose');
const vocabularyTestSchema = new mongoose.Schema({
    serviceInfo: {
        name: String
    },
    words: Array
})

module.exports = vocabularyTestSchema