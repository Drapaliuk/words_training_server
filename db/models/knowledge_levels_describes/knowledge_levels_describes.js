const mongoose = require('mongoose');
const KnowledgeLevelsDescribesSchema = require('../../schemas/knowledge_levels_describes/knowledge_levels_describes');

const KnowledgeLevelsDescribesModel = mongoose.model('knowledge_levels_describes', KnowledgeLevelsDescribesSchema);
module.exports = KnowledgeLevelsDescribesModel