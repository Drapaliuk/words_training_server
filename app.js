const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const profileSettingsRouter = require('./routes/profile_settings/profile_settings');
const personalDataRouter = require('./routes/user_personal_data/user_personal_data');
const wordsForTrainingRouter = require('./routes/words_for_training/words_for_training');
const wordKitsRouter = require('./routes/word_kits/word_kits');
const userVocabularyRouter = require('./routes/user_vocabulary/user_vocabulary');
const trainingResultRouter = require('./routes/training_result/training_result');
const knowledgeTestRouter = require('./routes/knowledge_test/knowledge_test');
const trainingpauseRouter = require('./routes/training_pause/training_pause');
const userWordKitRouter = require('./routes/user_wordkits/user_wordkits');
const taskLetterRouter = require('./routes/task_latter/task_latter');
const taskCardsRouter = require('./routes/task_cards/task_cards');
const mixTasksRouter = require('./routes/mix_tasks/mix_tasks');
const authRouter = require('./routes/auth/router');

const trainingsReducer = require('./routes/trainings/router');






const cors = require('cors');
const session = require('express-session');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/profile')

app.use('/training', trainingsReducer)
app.use('/auth', authRouter);
app.use('/userprofilesettings', profileSettingsRouter); //* +
app.use('/userbiography', personalDataRouter); //* + //// rename endpoint
app.use('/words', wordsForTrainingRouter); //* + rename endpoint
app.use('/userWordSet', userWordKitRouter); //* + rename endpoint
app.use('/userVocabulary', userVocabularyRouter); //* +
app.use('/vocabularyTest', knowledgeTestRouter); //* + rename endpoint
app.use('/setsNames', wordKitsRouter); //* +



app.use(function (err, req, res, next) {
  console.log('error', err)

  if (err.name === 'UnauthorizedError') {

    if(err.code === 'invalid_refresh_token') {
      return res.status(401).json({
        message: 'Your refresh token is invalid',
        responseCode: 4,
        errCode: err.code
      })
    }

    if(err.message === 'jwt expired') {
       return res.status(401).json({
         message: `Your access token has been expired, please send refresh token for restoration your access`,
         errorCode: 'expired_token',
         responseCode: 0
       })
    }

    if(err.code === 'credentials_bad_format') {
      return res.status(401).json({
        message: 'Your access token has invalid format',
        errorCode: err.code,
        responseCode: 2
      })
    }

    return res.status(401).json({
      message: 'Your access token is invalid',
      errorCode: err.code,
      responseCode: 3
    })
  }
});


app.use(function(req, res, next) {
  // catch 404 and forward to error handler
  next(createError(404));
});

app.use(function(err, req, res, next) {
    // error handler
    // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;