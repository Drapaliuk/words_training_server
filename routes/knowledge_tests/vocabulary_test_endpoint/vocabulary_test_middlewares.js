const KnowledgeTestModel = require('../../../db/models/knowledge_tests/vocabulary_test_model');
const Word = require('../../../db/models/word/word_model');
const User = require('../../../db/models/user/user_model');
const jsonwebtoken = require('jsonwebtoken');
const {jwt: jwtKey} = require('../../../config/keys')
const mixingElements = require('../../../utils/mixingElements/mixingElements');
const { testIds } = require('../configs')
const vocabularyTestAnalyser = require('../../../utils/knowledge_tests/vocabulary_test_results_analyser');
const authTokenModifier = require('../../../utils/auth_token_manipulator/auth_token_manipulator');

const middlewares = {
    get: async (req, res) => {
        const testWordsIds = await KnowledgeTestModel.findById(testIds.vocabulary_test)
        const words = await Word.find({'_id': {$in: testWordsIds.words}})
        const mixedWords = mixingElements(words) 
        res.status(200).json(mixedWords)
    },

    post: async (req, res) => {
        const testAnswers = req.body;
        const authToken = authTokenModifier.deleteBearer(req.headers.authorization)  
        const {id: userId} = jsonwebtoken.decode(authToken, jwtKey);
        const testResult = vocabularyTestAnalyser(testAnswers)
        User.findByIdAndUpdate(userId, {$push: {'knowledgeTests.vocabularyTest': {...testResult, test: testAnswers}}, 'knowledgeLevel.vocabularyLevel': testResult.level});
        res.send(testResult)
    }
}
  

module.exports = middlewares;