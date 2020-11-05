const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const profileSettingsRouter = require('./routes/profile_settings/profile_settings');
const personalDataRouter = require('./routes/user_personal_data/user_personal_data');
const wordsForTrainingRouter = require('./routes/words_for_training/words_for_training');
const wordKitsRouter = require('./routes/word_kits/word_kits');
const userVocabularyRouter = require('./routes/user_vocabulary/user_vocabulary');
const trainingResultRouter = require('./routes/training_result/training_result');
const knowledgeTestRouter = require('./routes/knowledge_test/knowledge_test');
const trainingpauseRouter = require('./routes/training_pause/training_pause');
const loginRouter = require('./routes/login/login');
const signinRouter = require('./routes/signin/signin');
const userWordKitRouter = require('./routes/user_wordkits/user_wordkits');

const taskLetterRouter = require('./routes/task_latter/task_latter');
const taskCardsRouter = require('./routes/task_cards/task_cards');
const mixTasksRouter = require('./routes/mix_tasks/mix_tasks');
const cors = require('cors');




var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexRouter);
app.use('/userprofilesettings', profileSettingsRouter); //* +
app.use('/userbiography', personalDataRouter); //* + //// rename endpoint
app.use('/words', wordsForTrainingRouter); //* + rename endpoint
app.use('/userWordSet', userWordKitRouter); //* + rename endpoint
app.use('/userVocabulary', userVocabularyRouter); //* +
app.use('/trainingResult', trainingResultRouter);//* +
app.use('/vocabularyTest', knowledgeTestRouter); //* + rename endpoint
app.use('/trainingpause', trainingpauseRouter); //* +
app.use('/setsNames', wordKitsRouter); //* +
app.use('/login', loginRouter); //* +
app.use('/signin', signinRouter); //* +
app.use('/taskLatter', taskLetterRouter); //* +
app.use('/taskCards', taskCardsRouter); //* +
app.use('/mixTasks', mixTasksRouter); //* +


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
