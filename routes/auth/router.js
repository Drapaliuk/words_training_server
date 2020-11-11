const express = require('express');
const router = express.Router();
const {jwt: jwtKey} = require('../../config/keys');
const verifyTokenMiddleware = require('express-jwt');

const isAuthorizationMiddleware = require('./is_authorization/is_authorization');
const signinMiddleware = require('./signin/signin');
const refreshTokenMiddleware = require('./refresh_token/refresh_token');
const loginMiddleware = require('./login/login');
const logoutMiddleware = require('./logout/logout');

router.post('/signin', signinMiddleware)
      .post('/refreshToken', refreshTokenMiddleware)
      .post('/login', loginMiddleware)
      .post('/logout', logoutMiddleware)
      .get('/isAuthorization', verifyTokenMiddleware({secret: jwtKey, algorithms: ['HS256']}), isAuthorizationMiddleware)


module.exports = router;