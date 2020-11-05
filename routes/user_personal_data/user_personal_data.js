var express = require('express');
var router = express.Router()
const User = require('../../db/models/user/user_model');


router.post('/', (req, res) => {
        const userId = req.body.userId;
        const postData = req.body.data;

        User.findByIdAndUpdate(userId, {'bio': postData}, {new: true}, (err, data) => {
            if(err) return res.send(err)
            return res.send({responseCode: 1})
                })
        })


        .get('/', (req, res) => {
            const userId = req.query.userid;
            
            User.findById(userId, {"bio": true} , { __v: 0, _id: 0, login: 0, password: 0, wordKits: 0, trainingResults: 0 })
                  .then((data) => res.send({ responseCode: 1, personalData: data.bio }));
        })


module.exports = router;