const mongoose = require('mongoose');
const vocabularyTestSchema = require('../../schemas/knowledge_tests/vocabulary_test_schema');

const KnowledgeTestModel = mongoose.model('knowledge_tests', vocabularyTestSchema);

module.exports = KnowledgeTestModel;