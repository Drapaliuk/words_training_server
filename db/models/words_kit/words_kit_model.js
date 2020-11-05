const mongoose = require('mongoose');
const WordsKitSchema = require('../../schemas/words_kit/words_kit_schema');

const WordsKit = mongoose.model('word_kits', WordsKitSchema)

module.exports = WordsKit;
