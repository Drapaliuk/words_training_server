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


const cors = require('cors');
const passport = require('passport');
require('./authentication/passport-configs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
var app = express();


const sessionConfigs = {
  secret: 'hghtyNN23h',
  store: new FileStore(),
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: false,
}


// app.use(expressJwtMiddleware({secret: jwtKey, algorithms: ['HS256']}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session(sessionConfigs));


app.use('/auth', authRouter);
app.use('/userprofilesettings', profileSettingsRouter); //* +
app.use('/userbiography', personalDataRouter); //* + //// rename endpoint
app.use('/words', wordsForTrainingRouter); //* + rename endpoint
app.use('/userWordSet', userWordKitRouter); //* + rename endpoint
app.use('/userVocabulary', userVocabularyRouter); //* +
app.use('/trainingResult', trainingResultRouter);//* +
app.use('/vocabularyTest', knowledgeTestRouter); //* + rename endpoint
app.use('/trainingpause', trainingpauseRouter); //* +
app.use('/setsNames', wordKitsRouter); //* +
app.use('/taskLatter', taskLetterRouter); //* +
app.use('/taskCards', taskCardsRouter); //* +
app.use('/mixTasks', mixTasksRouter); //* +
app.use(passport.initialize());
app.use(passport.session());



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