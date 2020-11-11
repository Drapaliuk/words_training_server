const jsonwebtoken = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const RefreshTokenModel = require('../../../db/models/refresh_token/refresh_token');
const {jwt: jwtKey} = require('../../../config/keys');
const authTokenManipulator = require('../../../utils/auth_token_manipulator/auth_token_manipulator');

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
    const newAccessToken = jsonwebtoken.sign({id: dbToken.userId}, jwtKey, {expiresIn: 5});

    await RefreshTokenModel.findOneAndUpdate({userId: dbToken.userId}, {token: newRefreshToken}) //перевірити чи працює
    return res.json({
        responseCode: 1,
        message: 'You got new access and refresh tokens',
        token: authTokenManipulator.addBearer(newAccessToken) ,
        refreshToken: newRefreshToken
    })
}  

module.exports = middleware;