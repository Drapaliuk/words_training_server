var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
       if(req.body) {
           const payload = [
               {
                  serviceInfo: {setName: req.body.wordSetName},
                  words: [...req.body.words]
                }
           ]
           res.send({responseCode: 1, payload})
           res.end()
       }
       res.send({responseCode: 0})
   })

module.exports = router;