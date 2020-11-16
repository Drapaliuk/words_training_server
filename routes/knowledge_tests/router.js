const express = require('express');
const router = express.Router();
const vocabularyTestMiddlewares = require('./vocabulary_test_endpoint/vocabulary_test_middlewares');

router.get('/vocabularytest', vocabularyTestMiddlewares.get)
      .post('/vocabularytest', vocabularyTestMiddlewares.post)

module.exports = router;