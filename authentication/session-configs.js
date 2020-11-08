const configs = {
    secret: 'hghtyNN23h',
    store: new FileStore(''),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
}

module.exports = configs;