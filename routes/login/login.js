var express = require('express');
var router = express.Router();
const User = require('../../db/models/user/user_model');

router.post('/',(req, res) => {
    const login = req.body.login;
    const password = req.body.password

    User.find({login: login})
            .then((foundUser, err) => {
                if(err) throw err;
                if(foundUser.length === 1) {
                    bcrypt.compare(password, foundUser[0].password, function(err, result) {
                        if(err) throw err;
                        if(result) {
                        const responseObject = {
                            responseCode: 1,
                            message: 'user has found',
                            errMessage: err,
                            userId: foundUser[0]._id
                        }

                            return res.send(responseObject)
                        }

                        return  res.send({responseCode: 2})
                    })
                    return
                }
                return res.send('Такий користувач не зареєстрований')
            })
   });

module.exports = router;