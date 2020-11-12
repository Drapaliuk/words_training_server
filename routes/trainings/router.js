const express = require('express');
const router = express.Router()
const resultMiddleware = require('./result/training_result'); //! перейменувати міддлвари, дуже погані назви
const pausePostMiddleware = require('./pause/post/post_middleware');
const pauseGetMiddleware = require('./pause/get/get_middleware');
const pauseDeleteMiddleware = require('./pause/delete/delete_middleware');
const pauseGetAllMiddleware = require('./pause/get_all_paused_trainings/get_all_middleware');
const spellingTrainingMiddleware = require('./modes/task_latter/task_latter');
const wordTrainingMiddleware = require('./modes/task_cards/task_cards');
const mixedModeMiddleware = require('./modes/mixed_mode/mix_tasks');

router.post('/results', resultMiddleware)
      .post('/pause', pausePostMiddleware)
      .post('/spelling', spellingTrainingMiddleware)
      .post('/words', wordTrainingMiddleware)
      .post('/mixedmode', mixedModeMiddleware)
      .get('/pause', pauseGetMiddleware)
      .get('/pause/all', pauseGetAllMiddleware)
      .delete('/pause', pauseDeleteMiddleware)

module.exports = router




// router.post('/trainingResult', resultMiddleware)
//       .post('/trainingpause', pausePostMiddleware)
//       .post('/taskLatter', spellingTrainingMiddleware)
//       .post('/taskCards', wordTrainingMiddleware)
//       .post('/mixTasks', mixedModeMiddleware)
//       .get('/trainingpause', pauseGetMiddleware)
//       .get('/trainingpause/all', pauseGetAllMiddleware)
//       .delete('/trainingpause', pauseDeleteMiddleware)



