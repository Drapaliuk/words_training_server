var express = require('express');
var router = express.Router();
// const jwtMiddleware = require('express-jwt');
const verifyTokenMiddleware = require('express-jwt');

const {jwt: jwtKey} = require('../../config/keys');
const jsonwebtoken = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const User = require('../../db/models/user/user_model');
const RefreshTokenModel = require('../../db/models/refresh_token/refresh_token');
const myTOk = 'Bearer zasdasdassadadsdasda'

const transformToken = token => token.split(' ')[1];
const addBearer = token => `Bearer ${token}`;

transformToken(myTOk)

const middleware = async function(req, res) {
    console.log('qwe', req.headers)
    // const token = transformToken(req.headers.authorization);
    // console.log(token)
    // const tokenPayload = jsonwebtoken.decode(token, jwtKey)
    // const {id: userId} = tokenPayload;
    // const newToken = jsonwebtoken.sign({id: userId}, jwtKey, {expiresIn: 60});
    res.status(200).json({
            message: 'Your are authorization',
            responseCode: 1,
            // token: addBearer(newToken),
    })
}
// router.get('/', middleware)

router.get('/', verifyTokenMiddleware({secret: jwtKey, algorithms: ['HS256']}), middleware)

module.exports = router;

