var express = require('express');
var router = express.Router();
const User = require('../../db/models/user/user_model');

router.post('/', (req, res) => {
        console.log(req.body)
       if(req.body) {
           const payload = [
               {
                  serviceInfo: {name: req.body.wordSetName},
                  words: [...req.body.words]
                }
           ]
           return res.send({responseCode: 1, payload})
       }
       res.send({responseCode: 0})
   })
    .get('/all', (req, res) => {

    })

module.exports = router;