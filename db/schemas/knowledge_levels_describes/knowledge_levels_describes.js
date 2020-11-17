const mongoose = require('mongoose');
const VocabularyLevelsDescribesSchema = require('./vocabulary_levels_describes');

const KnowledgeLevelsDescribesSchema = new mongoose.Schema({
    vocabularyLevelsDescribes: [VocabularyLevelsDescribesSchema]
});

module.exports = KnowledgeLevelsDescribesSchema;