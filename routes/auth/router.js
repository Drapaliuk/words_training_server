const express = require('express');
const router = express.Router();
const {jwt: jwtKey} = require('../../config/keys');
const verifyTokenMiddleware = require('express-jwt');

const isAuthorizationMiddlewares = require('./is_authorization/is_authorization');
const signinMiddlewares = require('./signin/signin');
const refreshTokenMiddlewares = require('./refresh_token/refresh_token');
const loginMiddlewares = require('./login/login');
const logoutMiddlewares = require('./logout/logout');

router.post('/signin', signinMiddlewares.post)
      .post('/refreshToken', refreshTokenMiddlewares.post)
      .post('/login', loginMiddlewares.post)
      .post('/logout', logoutMiddlewares.post)
      .get('/isAuthorization', verifyTokenMiddleware({secret: jwtKey, algorithms: ['HS256']}), isAuthorizationMiddlewares.get)



      
module.exports = router;



