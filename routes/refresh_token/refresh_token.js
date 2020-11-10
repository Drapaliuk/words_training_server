const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const RefreshTokenModel = require('../../db/models/refresh_token/refresh_token');

const middleware = async function(req, res, next) {
    const {refreshToken} = req.body
    const dbToken = await RefreshTokenModel.findOne({token: refreshToken}) 
    if(!dbToken) {
        const err = {
                name: 'UnauthorizedError',
                errCode: 'invalid_refresh_token',
            }
        return next(err, req, res, next)
    }

    const newRefreshToken = uuid();
    const newAccessToken = jsonwebtoken.sign({id: dbToken.userId});
    await RefreshTokenModel.findOneAndUpdate({userId: dbToken.userId}, {token: newRefreshToken}) //перевірити чи працює
    return res.json({
        responseCode: 1,
        message: 'You got new access and refresh tokens',
        token: newAccessToken,
        refreshToken: newRefreshToken
    })
}  

router.post('/', middleware)

module.exports = router;