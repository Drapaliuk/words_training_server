const User = require('../../../db/models/user/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {jwt: jwtKey} = require('../../../config/keys');
const { v4: uuid } = require('uuid');
const RefreshTokenModel = require('../../../db/models/refresh_token/refresh_token');

const middleware = (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    User.findOne({login: login})
        .then((user, err) => {
           if(err) throw err
           if(!user) {
                bcrypt.hash(password, 10)
                      .then(hashedPassword => {
                        const userObject = {
                           login: login,
                           password: hashedPassword
                        }
                        
                        User.create(userObject, (err, createdUser ) => {
                          if(err) res.send({responseCode: 3, errMessage: err});
                            const refreshToken = uuid()
                            const token = jwt.sign({id: createdUser._id}, jwtKey, {expiresIn: 5});
                            RefreshTokenModel.create({userId: createdUser._id, token: refreshToken})
                            return res.send({
                                responseCode: 1,
                                message: 'user has created',
                                err: err,
                                userId: createdUser._id,
                                token: `Bearer ${token}`,
                                refreshToken
                            })
                        } )
                    })
                return
           } else {
               return res.status(406).send({
                responseCode: 0,
                message: 'This login has already in use',
                errMessage: err,
                errCode: 'login_in_use'
            })
           }
        })
}

module.exports = middleware;