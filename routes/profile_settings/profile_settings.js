var express = require('express');
var router = express.Router()
const User = require('../../db/models/user/user_model');

router.post('/', (req, res) => {
       const userId = req.body.userId
       const postData = req.body.data;
       User.findByIdAndUpdate(userId, {"profileSettings": postData}, {new: true}, (err, data) => {
           if(err) res.send(err);
           res.send({responseCode: 1})
       })
});


router.get('/', (req, res) => {
     const userId = req.query.userid;
     User.findById(userId, {"profileSettings": true}, { __v: 0, _id: 0, login: 0, password: 0, wordKits: 0, trainingResults: 0 })
          .then(data => res.send(data.profileSettings))
});

module.exports = router;