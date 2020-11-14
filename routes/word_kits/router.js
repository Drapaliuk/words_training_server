const express = require('express');
const router = express.Router();
const wordsForTrainingMiddlewares = require('./words_for_training/words_for_training_middlewares');
const wordsKitsMiddlewares = require('./word_kits/word_kits_middlewares');

router.get('/wordsfortraining', wordsForTrainingMiddlewares.get)
      .get('/all', wordsKitsMiddlewares.get)

module.exports = router;