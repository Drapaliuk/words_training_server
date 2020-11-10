var express = require('express');
var router = express.Router();
const User = require('../../db/models/user/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwt: jwtKey} = require('../../config/keys');
const { v4: uuid } = require('uuid');

const RefreshTokenModel = require('../../db/models/refresh_token/refresh_token');

const middleware = async function(req, res) {
    const login = req.body.login;
    const password = req.body.password;
    console.log(req.body)
    const user = await User.findOne({login: login });

    if(user) {
        const passwordResult = bcrypt.compareSync(password, user.password);
        if(passwordResult) {
            const token = jwt.sign({id: user._id}, jwtKey, {expiresIn: 120});
            const refreshToken = uuid()
            RefreshTokenModel.create({userId: user._id, token: refreshToken});

            res.status(200).json({
                responseCode: 1,
                message: 'Password had matched',
                token: `Bearer ${token}`,
                userId: user._id,
                refreshToken
            })
        } else {
            res.status(401).json({
                message: 'Password is not match',
                responseCode: 0
            })
        }

    } else {
        res.status(404).json({
            responseCode: 2,
            message: 'User has not found'
        })
    }
}




router.post('/', middleware);

module.exports = router;