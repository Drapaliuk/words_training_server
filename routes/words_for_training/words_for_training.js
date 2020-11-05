var express = require('express');
var router = express.Router();
const WordsKit = require('../../db/models/words_kit/words_kit_model');
const Word = require('../../db/models/word/word_model');

router.get('/',(req, res) => {
        let kitName = req.query.setname;
        
        WordsKit.find({'serviceInfo.name': kitName}, (err, data) => { //!повертає слова певного набору
            const wordsId = data[0].words
            Word.find({'_id': {$in: wordsId}}, {__v: 0}, (err, data) => {
                res.json(data)
            })
        })
    })

module.exports = router;