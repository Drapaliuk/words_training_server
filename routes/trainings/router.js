const express = require('express');
const router = express.Router()
const resultMiddlewares = require('./result/result_middlewares');
const pauseMiddlewares = require('./pause/pause_middlewares');
const pauseGetAllMiddlewares = require('./pause/all_paused_trainings/all_paused_trainings_middlewares');
const spellingTrainingMiddlewares = require('./modes/spelling_mode/spelling_mode_middlewares');
const wordTrainingMiddlewares = require('./modes/words_mode/words_mode_middlewares');
const mixedModeMiddlewares = require('./modes/mixed_mode/mixed_mode_middlewares');

router.post('/results', resultMiddlewares.post)
      .post('/pause', pauseMiddlewares.post)
      .post('/spelling', spellingTrainingMiddlewares.post)
      .post('/words', wordTrainingMiddlewares.post)
      .post('/mixedmode', mixedModeMiddlewares.post)
      .get('/pause', pauseMiddlewares.get)
      .get('/pause/all', pauseGetAllMiddlewares.get)
      .delete('/pause', pauseMiddlewares.delete)

module.exports = router;