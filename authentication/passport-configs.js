const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models/user/user_model');
const bcrypt = require('bcrypt');

const userDB = {
  id: 136345,
  email: 'test@mail.ru',
  password: '123',
};

passport.serializeUser(function(user, done) {
  console.log('Сериализация: ', user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('Десериализация: ', id);
  const user = userDB.id === id ? userDB : false;
  done(null, user);
});

passport.use(new LocalStrategy(
  {usernameField: 'login'},
  function(username, password, done) {
    User.findOne({ login: username }, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      bcrypt.compare(password, user.password, (err, result) => {  //! тут потрібно використати asynch await
        if(!result) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
      });

    });
  }
));