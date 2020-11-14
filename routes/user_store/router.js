const express = require('express');
const router = express.Router();
const userVocabularyMiddlewares = require('./user_vocabulary/user_vocabulary_middlewares');
const userWordKitsMiddleware = require('./user_wordkits/user_wordkits_middlewares');

router.post('/uservocabulary', userVocabularyMiddlewares.post)
      .get('/uservocabulary', userVocabularyMiddlewares.get)
      .delete('/uservocabulary', userVocabularyMiddlewares.delete)
      .post('/userwordkits', userWordKitsMiddleware.post)
      .get('/userwordkits', userWordKitsMiddleware.get)

module.exports = router;