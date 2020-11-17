const mongoose = require('mongoose');
const KnowledgeLevelsDescribesSchema = require('../../schemas/knowledge_levels_describes/knowledge_levels_describes');

const VocabularyLevelsDescribesModel = mongoose.model('knowledge_levels_describes', KnowledgeLevelsDescribesSchema);
