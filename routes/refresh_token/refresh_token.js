const mongoose = require('mongoose');
const RefreshTokenModel = require('../../db/models/refresh_token/refresh_token');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const RefreshTokenModel = require('../../db/models/refresh_token/refresh_token');



const middleware = async function(req, res) {
    const {refreshToken} = req.body
    const dbToken = await RefreshTokenModel.findOne({token: refreshToken}) 
    if(!dbToken) {
        return;
    }

    const newRefreshToken = uuid();
    const accessToken = jwt.sign({id: dbToken.userId});
    await RefreshTokenModel.findOneAndUpdate({userId: dbToken.userId}, {token: newRefreshToken}) //перевірити чи працює
    res.json({
        token: accessToken,
        refreshToken: newRefreshToken
    })
}   


router.use('/', middleware)

module.exports = router;