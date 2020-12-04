const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authRouter = require('./routes/auth/router');
const profileRouter = require('./routes/profile/router');
const trainingsRouter = require('./routes/trainings/router');
const wordsRouter = require('./routes/word_kits/router');
const userStoreRouter = require('./routes/user_store/router');
const knowledgeTestsRouter = require('./routes/knowledge_tests/router');
const handlerError401 = require('./error_handlers/401');
const VocabularyTestModel = require('./db/models/knowledge_tests/vocabulary_test_model');
const KnowledgeLevelsDescribesModel = require('./db/models/knowledge_levels_describes/knowledge_levels_describes'); 

const WordsKit = require('./db/models/words_kit/words_kit_model');

const cors = require('cors');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/profile', profileRouter)
app.use('/wordkits', wordsRouter)
app.use('/training', trainingsRouter)
app.use('/auth', authRouter);
app.use('/userstore', userStoreRouter)
app.use('/knowledgetests', knowledgeTestsRouter)

app.use(handlerError401);


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

//! ЗРОБИТИ MIDDLEWARE ЯКИЙ БИ ВИТЯГУВАВ ІД ЮЗЕРА З КОЖНОГО ЗАПИТУ НА СЕРВЕР І КИДАВ ДАЛІ, А ЯКЩО ВІН ПРОСТРОЧЕНИЙ КИДАВ ЗАПИТ НА РЕФРЕШ
//! ЗРОБИТИ НА ФРОНТІ ІНТЕРСЕПТОР ЯКИЙ ПРЄДНУВАТИМЕ ДО ВСІХ ЗАПИТІВ НА СЕРВЕР ЗАГОЛОВК АВТОРИЗАЦІЇ


module.exports = app;