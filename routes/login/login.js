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
    const candidate = await User.findOne({login: login });

    if(candidate) {
        const passwordResult = bcrypt.compareSync(password, candidate.password);
        if(passwordResult) {
            const token = jwt.sign({id: candidate._id}, jwtKey, {expiresIn: 1});
            const refreshToken = uuid()
            RefreshTokenModel.create({userId: candidate._id, token: refreshToken});

            res.status(200).json({
                responseCode: 1,
                message: 'Password had matched',
                token: `Bearer ${token}`,
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