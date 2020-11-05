var express = require('express');
var router = express.Router();
const User = require('../../db/models/user/user_model');


router.post('/',(req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    User.find({login: login})
         .then((data, err) => {
            if(err) throw err
            if(data.length === 0) {
                bcrypt.hash(password, 10)
                      .then(hash => {
                        const userObject = {
                            login: login,
                            password: hash
                        }
                        Users.create(userObject, (err, createdObject ) => {
                           if(err) res.send({responseCode: 3, errMessage: err})
                                const successResponse = {
                                    responseCode: 1,
                                    message: 'user has created',
                                    errMessage: err,
                                    userId: createdObject._id
                                }
                                return res.send(successResponse)
                        } )
                      })
                return
            }
            const mistakeResponse = {
                responseCode: 2,
                message: 'this login has already in use',
                errMessage: err
            }

            return res.send(mistakeResponse)
         })
})

module.exports = router;