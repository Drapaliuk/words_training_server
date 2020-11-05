var express = require('express');
var router = express.Router();
const WordsKit = require('../../db/models/words_kit/words_kit_model');



router.get('/', (req, res) => {
    console.log('aaaa')
    return res.end()
    WordsKit.find((err, data) => {
         const oneSet = data.find((el) => el.serviceInfo.setName === 'travel');
         res.send(oneSet.words)
    })
})
  

module.exports = router;