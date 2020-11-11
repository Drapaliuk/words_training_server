const User = require('../../../db/models/user/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwt: jwtKey} = require('../../../config/keys');
const { v4: uuid } = require('uuid');
const authTokenManipulator = require('../../../utils/auth_token_manipulator/auth_token_manipulator');
const RefreshTokenModel = require('../../../db/models/refresh_token/refresh_token');

const middleware = async function(req, res) {
    const login = req.body.login;
    const password = req.body.password;
    const user = await User.findOne({login: login });

    if(user) {
        const passwordResult = bcrypt.compareSync(password, user.password);
        if(passwordResult) {
            const authToken = jwt.sign({id: user._id}, jwtKey, {expiresIn: 5});
            const refreshToken = uuid()
            RefreshTokenModel.create({userId: user._id, token: refreshToken});

            res.status(200).json({
                responseCode: 1,
                message: 'Password had matched',
                token: authTokenManipulator.addBearer(authToken),
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

module.exports = middleware;