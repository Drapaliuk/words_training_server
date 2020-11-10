var express = require('express');
var router = express.Router();
const User = require('../../db/models/user/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwt: jwtKey} = require('../../config/keys');
const { v4: uuid } = require('uuid');
const jwtMiddleware = require('express-jwt');
const RefreshTokenModel = require('../../db/models/refresh_token/refresh_token');

const middleware = async function(req, res) {
    const {refreshToken} = req.body;
    
    RefreshTokenModel.findOneAndDelete({token: refreshToken})
                     .then(result => {
                         console.log(result)
                         if(!result) return res.status(200).json({responseCode: 1, message: 'user had logout'})
                         return //! ?
                     })
}

router.post('/', middleware);

// router.post('/', jwtMiddleware({secret: jwtKey, algorithms: ['HS256']}),  middleware);

module.exports = router;